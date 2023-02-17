// @ts-ignore
import Quagga from "quagga";
import { QuaggaJSStatic } from "@ericblade/quagga2";
import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { ResultType } from "../../component/ScanResult";
import { useScreen } from "usehooks-ts";

const BarCodeScanner = Quagga as QuaggaJSStatic;

function getMedian(arr: any[]) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes: any[]) {
  const errors = decodedCodes
    .filter((x) => x.error !== undefined)
    .map((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}

const useBarCodeScanner = (target: RefObject<HTMLDivElement>) => {
  const screen = useScreen();

  const [barCode, setBarCode] = useState<ResultType>();

  const errorCheck = useCallback((result: ResultType) => {
    const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
    // if Quagga is at least 75% certain that it read correctly, then accept the code.
    if (err < 0.25) {
      if(!barCode){
        setBarCode(result);
        BarCodeScanner.pause()
      }
    }
  }, []);

  const handleProcessed = (result: {
    boxes: any[];
    box: any;
    codeResult: { code: any };
    line: any;
  }) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    drawingCtx.clearRect(
      0,
      0,
      parseInt(drawingCanvas.getAttribute("width")),
      parseInt(drawingCanvas.getAttribute("height"))
    );
    if (result) {
      if (result.boxes) {
        // Draw the filled white box with a black border
        result.boxes
          .filter(function (box) {
            return box !== result.box;
          })
          .forEach(function (box) {
            drawingCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
            drawingCtx.fill();

            if(result.codeResult && result.codeResult.code){
              console.log("remove box")
            }
            BarCodeScanner.ImageDebug.drawPath(
              box,
              { x: 0, y: 1 },
              drawingCtx,
              {
                color: "white",
                lineWidth: 1,
              }
            );
           
          });
      }

      if (result.box) {
        BarCodeScanner.ImageDebug.drawPath(
          result.box,
          { x: 0, y: 1 },
          drawingCtx,
          {
            color: "white",
            lineWidth: 2,
          }
        );
      }

      if (result.codeResult && result.codeResult.code) {
        drawingCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
        drawingCtx.fill();
        BarCodeScanner.ImageDebug.drawPath(
          result.line,
          { x: "x", y: "y" },
          drawingCtx,
          { color: "red", lineWidth: 3 }
        );
      }
    }
  };

  useLayoutEffect(() => {
    BarCodeScanner.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: screen?.width,
            height: screen?.height,
            facingMode: "environment",
          },
          target: target?.current as Element,
        },
        locator: {
          patchSize: "large",
          halfSample: true,
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
        },
        numOfWorkers: 4,
        frequency: 10,
        decoder: {
          readers: ["ean_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
        },
        locate: true,
      },
      (err) => {
        BarCodeScanner.onProcessed(handleProcessed);

        if (err) {
          return console.log("Error starting BarCodeScanner:", err);
        }
        if (target && target.current) {
          BarCodeScanner.start();
        }
        BarCodeScanner.onDetected(errorCheck);
      }
    );

    return () => {
      BarCodeScanner.offDetected(errorCheck);
      BarCodeScanner.offProcessed(handleProcessed);
      BarCodeScanner.stop();
    };
  }, [target]);

  return { barCode, target };
};

export default useBarCodeScanner;
