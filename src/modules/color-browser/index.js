import React from "react";
import "./style.css";

import Color from "../models/Color";
import ConfigPanel from "../config-panel";
import Canvas from "../canvas";
import ImagePicker from "../image-picker";
import Utils from "../helpers/Utils";

class ColorBrowser extends React.PureComponent {
  initialValue = {
    color: new Color({
      red: 200,
      green: 150,
      blue: 100
    }),
    shades: 8,
    clipboardHistory: Utils.getFromLocalStorage("clipboardHistory", [])
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.initialValue
    };

    this.onChange = this.onChange.bind(this);
    this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
    this.onClearHistory = this.onClearHistory.bind(this);
  }
  onChange(
    {
      color = this.initialValue.color,
      shades = this.initialValue.shades
    } = this.initialValue
  ) {
    this.setState({ color, shades });
  }
  onCopyToClipboard(color) {
    this.setState(state => {
      const { clipboardHistory } = state;

      const colorIdx = this.state.clipboardHistory.indexOf(color);
      let updatedHistory = [color, ...clipboardHistory];
      if (colorIdx > 0) {
        updatedHistory.splice(colorIdx + 1, 1);
      }
      if (updatedHistory.length > 15) {
        updatedHistory.length = 15;
      }
      Utils.saveToLocalStorage("clipboardHistory", updatedHistory);
      return { clipboardHistory: updatedHistory };
    });
  }
  onClearHistory() {
    this.setState({
      clipboardHistory: []
    });
    Utils.saveToLocalStorage("clipboardHistory", []);
  }
  render() {
    const { color, shades, clipboardHistory } = this.state;
    return (
      <div className="color-browser">
        <div className="color-container">
          <ImagePicker onChange={this.onChange} />
          <ConfigPanel
            color={color}
            shades={shades}
            onChange={this.onChange}
            clipboardHistory={clipboardHistory}
            onClearHistory={this.onClearHistory}
          />
        </div>
        {color && (
          <Canvas
            color={color}
            shades={shades}
            onCopyToClipboard={this.onCopyToClipboard}
          />
        )}
      </div>
    );
  }
}

export default ColorBrowser;
