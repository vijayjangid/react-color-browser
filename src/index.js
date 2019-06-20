import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import ColorBrowser from "./modules/color-browser";

function App() {
  return (
    <div className="App">
      <h1>Color Browser</h1>
      <ColorBrowser />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
