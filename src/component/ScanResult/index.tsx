import Portal from "../Portal";
import { body, content, container, header, barCodeImage, searchSvg, barCodeResult } from "./style";
import { SearchSymbol } from "../Icon";
import useScannedState from "../../hooks/state/useScannedState";

export type ResultType = {
  imgUrl?: string;
  codeResult: {
    format: string;
    code: string | null;
    decodedCodes: any[];
  };
};

const ScanResult = ({ scanResult }: { scanResult?: ResultType }) => {
  const { scanned, updateScanned } = useScannedState()
  return (
    <Portal>
      <div className={container()}>
        <div className={content()}>
          <header className={header()}>
            <p>1 item</p>
            <span onClick={() => updateScanned(false)}>Clear</span>
          </header>
          <main className={body()}>
            <img className={barCodeImage()} src="/barcode-symbol.png" alt="Barcode Symbol"/>
            <div className={barCodeResult()}>
              <p>{scanned ? scanResult?.codeResult?.format.split("_").join("-").toUpperCase() : "EAN-13"}</p>
              <span>{scanned ? scanResult?.codeResult?.code :"XXXXXXXXXXXXX"}</span>
            </div>
            <SearchSymbol className={searchSvg()} />
          </main>
        </div>
      </div>
    </Portal>
  );
};

export default ScanResult;
