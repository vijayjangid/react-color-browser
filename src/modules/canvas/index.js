import React from "react";
import "./style.css";
import Color from "../Color";

class Canvas extends React.PureComponent {
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
    return (
      <div className="canvas">
        <div>
          {shadesStyles &&
            shadesStyles.map((shade, index) => (
              <div key={index} style={shade} title={shade.background}>
                {shade.background}
              </div>
            ))}
        </div>
        <div className="center" style={style}>
          {style.background}
        </div>
      </div>
    );
  }
}

export default Canvas;
