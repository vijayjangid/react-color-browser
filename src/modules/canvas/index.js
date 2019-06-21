import React from "react";
import "./style.css";
import Color from "../models/Color";
import Utils from "../helpers/Utils";

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
      copySupported: Utils.isCommandSupported("copy")
    });
  }
  onCopy({ target }) {
    const { copySupported, timeout } = this.state;
    const { textContent } = target;
    if (copySupported && textContent) {
      if (timeout) {
        clearTimeout(timeout);
      }

      Utils.copyStringToClipboard(textContent.toUpperCase());
      const _timeout = setTimeout(() => {
        Utils.clearRange();
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

  render() {
    const { color, shades } = this.props || {};
    const colorObj = new Color({ ...color });
    const colorHex = colorObj.toHex();
    const colorShades = colorObj.getShades(shades);
    const shadesStyles = colorShades.map(shade => ({
      background: shade,
      color: Color.fromHex(shade).getInvertColor()
    }));
    const style = {
      background: colorHex,
      color: colorObj.getInvertColor()
    };
    const { copiedText } = this.state;
    return (
      <div className="canvas">
        <div className="shades">
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
        <div className="current" style={style}>
          <span className="color-value" onClick={this.onCopy}>
            {copiedText === style.background ? "copied!" : style.background}
          </span>
        </div>
      </div>
    );
  }
}

export default Canvas;
