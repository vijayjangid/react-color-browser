import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import ColorBrowser from "./modules/color-browser";
import ErrorBoundary from "./modules/error-boundary";

function Footer() {
  return (
    <footer id="app-footer">
      <ul>
        <li>
          CodeSandbox:
          <a
            href="https://codesandbox.io/s/github/vijayjangid/react-color-browser"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-color-browser
          </a>
        </li>
        <li>
          Github:
          <a
            href="https://github.com/vijayjangid/react-color-browser"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-color-browser
          </a>
        </li>
        <li>
          twitter:
          <a
            className="no-underline"
            href="https://twitter.com/_vijayjangid_"
            target="_blank"
            rel="noopener noreferrer"
          >
            @_vijayjangid_
          </a>
        </li>
        <li className="made-with-love">
          made with <span className="heart">&hearts;</span>
        </li>
      </ul>
    </footer>
  );
}
function App() {
  return (
    <div className="App">
      <h1>Color Browser</h1>
      <ErrorBoundary>
        <ColorBrowser />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
