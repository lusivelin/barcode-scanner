// @ts-ignore
import Quagga from "quagga";
import { QuaggaJSStatic, QuaggaJSConfigObject } from "@ericblade/quagga2";
import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { ResultType } from "../../component/ScanResult";
import { useScreen } from "usehooks-ts";
import useScannedState from "../state/useScannedState";

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

const useBarCodeScanner = (
  target: RefObject<HTMLDivElement>,
  config?: QuaggaJSConfigObject
) => {
  const screen = useScreen();
  const { scanned, updateScanned } = useScannedState();

  const [scanResult, setScanResult] = useState<ResultType>();

  const beep = () => {
    const beepSound = new Audio("/sound/beep.mp3");
    beepSound.play();
  };

  const errorCheck = useCallback((result: ResultType) => {
    const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
    // only 10% error
    const VALUE = 1;
    if (err < VALUE) {
      if (!scanResult) {
        const canvas = BarCodeScanner.canvas.dom.image;
        var img = canvas.toDataURL("image/png");
        setScanResult({ ...result, imgUrl: img });
        updateScanned(false);
        beep();
        BarCodeScanner.pause();
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
    result?.boxes &&
      result.boxes
        .filter(function (box) {
          return box !== result.box;
        })
        .forEach(function (box) {
          drawingCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
          drawingCtx.fill();

          BarCodeScanner.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
            color: "white",
            lineWidth: 1,
          });
        });
  };

  useLayoutEffect(() => {
    const defaultConfig: QuaggaJSConfigObject = {
      inputStream: {
        type: "LiveStream",
        constraints: {
          width: screen?.availWidth,
          height: screen?.availHeight,
          facingMode: "environment",
        },
        target: target?.current as Element,
      },
      locator: {
        patchSize: "large",
        halfSample: true,
      },
      numOfWorkers: 4,
      frequency: 10,
      decoder: {
        readers: ["code_128_reader", "ean_reader", "upc_reader"],
      },
      locate: true,
      ...config,
    };

    BarCodeScanner.init(defaultConfig, (err) => {
      BarCodeScanner.onProcessed(handleProcessed);

      if (err) {
        return console.log("Error starting BarCodeScanner:", err);
      }
      if (target && target.current && !scanned) {
        BarCodeScanner.start();
      }
      BarCodeScanner.onDetected(errorCheck);
    });

    return () => {
      BarCodeScanner.offDetected(errorCheck);
      BarCodeScanner.offProcessed(handleProcessed);
      BarCodeScanner.stop();
    };
  }, [target, scanned]);

  return { scanResult, target };
};

export default useBarCodeScanner;
