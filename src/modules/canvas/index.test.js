import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Canvas from ".";
import Color from "../models/Color";

describe("canvas component", () => {
  it("renders correctly", () => {
    const color = {
      red: 200,
      green: 200,
      blue: 200
    };
    const colorObj = new Color({ ...color });
    const shadeCount = 12;
    const shades = colorObj.getShades(shadeCount);

    const renderer = new ShallowRenderer();
    renderer.render(<Canvas color={color} shades={shadeCount} />);
    const result = renderer.getRenderOutput();
    const [shadesDiv, currentDiv] = result.props.children;

    shadesDiv.props.children.forEach((shade, index) => {
      expect(shade.props.children.props.children).toBe(shades[index]);
    });

    expect(currentDiv.props.children.props.children).toBe(colorObj.toHex());
  });
});
