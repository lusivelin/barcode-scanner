import { useEffect, useMemo, useRef } from "react";
import useBarCodeScanner from "../../hooks/services/useBarCodeScanner";
import { container } from "./style";

const Scanner = (props: { onDetected: any }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { barCode } = useBarCodeScanner(targetRef);
  console.log({barCode})

  return <div ref={targetRef} className={container()}></div>;
};

export default Scanner;
