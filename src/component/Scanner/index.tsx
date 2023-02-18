import { useEffect, useRef } from "react";
import useBarCodeScanner from "../../hooks/services/useBarCodeScanner";
import { container } from "./style";
import ScanResult from "../ScanResult";
import { useScreen } from "usehooks-ts";
import useScannedState from "../../hooks/state/useScannedState";

const Scanner = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const screen = useScreen();
  const { scanResult } = useBarCodeScanner(targetRef);
  const { scanned, updateScanned } = useScannedState();

  useEffect(() => {
    if (scanResult?.imgUrl) {
      updateScanned(true);
    }

    return () => {
      updateScanned(undefined);
    };
  }, [scanResult, updateScanned]);

  return (
    <>
      {scanned && <img src={scanResult?.imgUrl} />}
      <div
        ref={targetRef}
        className={container({
          css: {
            "& video, canvas": {
              width: screen?.width,
              height: screen?.height,
            },
          },
        })}
      ></div>
      <ScanResult scanResult={scanResult} />
    </>
  );
};

export default Scanner;
