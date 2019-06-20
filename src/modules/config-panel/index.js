import React from "react";
import "./style.css";

import Color from "../Color";

class ConfigPanel extends React.PureComponent {
  initialValue = {
    color: new Color({
      red: 200,
      green: 150,
      blue: 100
    }),
    shades: 8
  };
  MIN_RGB = 0;
  MAX_RGB = 255;
  MIN_SHADES = 2;
  MAX_SHADES = 16;
  constructor(props) {
    super(props);
    this.state = {
      ...this.initialValue
    };
    props.onChange({ ...this.state });

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleShadesChange = this.handleShadesChange.bind(this);
  }

  handleColorChange({ target: { name, value } = {} }) {
    if (value) {
      const { color } = this.state;
      color.update({ key: name, value });
      this.setState({ color: new Color(color) }, () => {
        this.props.onChange({ ...this.state });
      });
    }
  }
  handleShadesChange({ target: { name, value } } = {}) {
    if (
      value &&
      value >= this.MIN_SHADES &&
      value <= this.MAX_SHADES &&
      value % 2 === 0
    ) {
      this.setState({ [name]: value }, () => {
        this.props.onChange({ ...this.state });
      });
    }
  }
  render() {
    const { color, shades } = this.state;

    return (
      <div className="config-panel">
        {color &&
          color.toArray().map((c, i) => (
            <div key={i} className="config-row">
              <label htmlFor={c.key}>{c.name}</label>
              <input
                className="slider"
                name={c.key}
                type="range"
                value={c.value}
                min={this.MIN_RGB}
                max={this.MAX_RGB}
                onChange={this.handleColorChange}
              />
              <input
                type="number"
                name={c.key}
                value={c.value}
                min={this.MIN_RGB}
                max={this.MAX_RGB}
                onChange={this.handleColorChange}
              />
            </div>
          ))}
        {color && (
          <div className="config-row">
            <span>{color.toHex()}</span>
          </div>
        )}
        <div className="config-row shades">
          <label htmlFor="shades">Total Shades</label>
          <input
            className="slider"
            name="shades"
            type="range"
            value={shades}
            min={this.MIN_SHADES}
            max={this.MAX_SHADES}
            step="2"
            onChange={this.handleShadesChange}
          />
          <input
            type="number"
            name="shades"
            value={shades}
            step="2"
            min={this.MIN_RGB}
            max={this.MAX_RGB}
            onChange={this.handleShadesChange}
          />
        </div>
      </div>
    );
  }
}

export default ConfigPanel;
