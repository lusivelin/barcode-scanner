import Scanner from "./component/Scanner/index";
import { globalStyles } from "./stitches.config";

function App() {
  globalStyles();

  return (
    <div className="App">
      <Scanner />
    </div>
  );
}

export default App;
