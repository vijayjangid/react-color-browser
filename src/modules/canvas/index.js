import React from "react";
import "./style.css";
import Color from "../Color";

class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copiedText: null,
      copySupported: false,
      timeout: null
    };
    this.onCopy = this.onCopy.bind(this);
  }
  componentDidMount() {
    this.setState({
      copySupported: document.queryCommandSupported("copy")
    });
  }
  onCopy({ target }) {
    const { copySupported, timeout } = this.state;
    const { textContent } = target;
    if (copySupported && textContent) {
      if (timeout) {
        clearTimeout(timeout);
      }

      this.selectRange(target);
      document.execCommand("copy");

      const _timeout = setTimeout(() => {
        this.clearRange();
        this.setState({
          copiedText: null,
          timeout: null
        });
      }, 2000);
      this.setState({
        copiedText: textContent,
        timeout: _timeout
      });
    }
  }
  selectRange(node) {
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.warn("Could not select text in node: Unsupported browser.");
    }
  }
  clearRange() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      // IE?
      document.selection.empty();
    }
  }
  render() {
    const { color, shades } = this.props || {};
    const colorObj = new Color({ ...color });
    const colorHex = colorObj.toHex();
    const colorShades = colorObj.getShades(shades);
    const shadesStyles = colorShades.map(shade => ({
      background: shade
    }));
    const style = {
      background: colorHex
    };
    const { copiedText } = this.state;
    return (
      <div className="canvas">
        <div>
          {shadesStyles &&
            shadesStyles.map((shade, index) => (
              <div key={index} style={shade} title={shade.background}>
                <span className="color-value" onClick={this.onCopy}>
                  {copiedText === shade.background
                    ? "copied!"
                    : shade.background}
                </span>
              </div>
            ))}
        </div>
        <div className="center" style={style}>
          <span className="color-value" onClick={this.onCopy}>
            {copiedText === style.background ? "copied!" : style.background}
          </span>
        </div>
      </div>
    );
  }
}

export default Canvas;
