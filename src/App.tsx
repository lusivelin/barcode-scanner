import { SetStateAction, useRef, useState } from "react";
import "./App.css";
import Scanner from "./component/Scanner/index";
import { globalStyles } from "./stitches.config";

function App() {
  globalStyles();

  const [camera, setCamera] = useState(true);
  const [result, setResult] = useState(null);

  const onDetected = (result: SetStateAction<null>) => {
    console.log({ result });
    setResult(result);
  };
  console.log({ data: result });


  return (
    <div className="App">
      <div className="container">
        {camera && <Scanner onDetected={(value: any) => console.log({value})} />}
      </div>
    </div>
  );
}

export default App;
