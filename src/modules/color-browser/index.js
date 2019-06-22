import React from "react";
import "./style.css";

import Color from "../models/Color";
import ConfigPanel from "../config-panel";
import Canvas from "../canvas";
import ImagePicker from "../image-picker";

class ColorBrowser extends React.PureComponent {
  initialValue = {
    color: new Color({
      red: 200,
      green: 150,
      blue: 100
    }),
    shades: 8
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.initialValue
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(
    {
      color = this.initialValue.color,
      shades = this.initialValue.shades
    } = this.initialValue
  ) {
    this.setState({ color, shades });
  }
  render() {
    const { color, shades } = this.state;
    return (
      <div className="color-browser">
        <div className="color-container">
          <ImagePicker onChange={this.onChange} />
          <ConfigPanel color={color} shades={shades} onChange={this.onChange} />
        </div>
        {color && <Canvas color={color} shades={shades} />}
      </div>
    );
  }
}

export default ColorBrowser;
