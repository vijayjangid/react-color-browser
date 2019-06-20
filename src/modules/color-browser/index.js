import React from "react";
import "./style.css";

import ConfigPanel from "../config-panel";
import Canvas from "../canvas";

class ColorBrowser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      shades: null
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange({ color, shades }) {
    this.setState({ color, shades });
  }
  render() {
    const { color, shades } = this.state;
    return (
      <div className="color-browser">
        <ConfigPanel onChange={this.onChange} />
        {color && <Canvas color={color} shades={shades} />}
      </div>
    );
  }
}

export default ColorBrowser;
