import React from "react";
import "./style.css";
import gradient from "./gradient.png";
import gradientCircle from "./gradient-circle.png";
import swatches from "./swatches.png";
import Color from "../models/Color";

export default class ImagePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enablePicker: false,
      gradientType: "linear"
    };

    this.canvas = React.createRef();
    this.onChangeGradientType = this.onChangeGradientType.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onCanvasMouseUp = this.onCanvasMouseUp.bind(this);
    this.onCanvasMouseOver = this.onCanvasMouseOver.bind(this);
    this.onCanvasMouseDown = this.onCanvasMouseDown.bind(this);
    this.onClickSwatch = this.onClickSwatch.bind(this);
  }

  componentDidMount() {
    this.drawImageOnCanvas();
  }

  onClickSwatch({ target }) {
    const color = target.getAttribute("color");
    this.props.onChange({ color: Color.fromHex(color) });
  }

  onChangeGradientType({ target: { name } }) {
    this.setState(
      {
        gradientType: name || "swatches"
      },
      () => {
        this.drawImageOnCanvas();
      }
    );
  }

  onImageChange({ target: { files } }) {
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        this.drawImageOnCanvas({ src: result });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  drawImageOnCanvas({ src, gradientType = this.state.gradientType } = {}) {
    const gradientMapper = {
      linear: gradient,
      circular: gradientCircle,
      swatches: swatches
    };

    // if (gradientType === "swatches") {
    //   const canvas = this.canvas.current;
    //   const ctx = canvas.getContext("2d");
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   const swatchSize = 280 / 7;
    //   for (let i = 0; i < 7; i++) {
    //     for (let j = 0; j < 7; j++) {
    //       const red = j % 3 === 0 || j % 4 === 0 ? ((i + 1) * 255) / 7 : 0;
    //       const green = j % 3 === 1 || j % 5 === 0 ? ((i + 1) * 255) / 7 : 0;
    //       const blue = j % 3 === 2 || j % 6 === 0 ? ((i + 1) * 255) / 7 : 0;

    //       ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    //       ctx.fillRect(i * swatchSize, j * swatchSize, swatchSize, swatchSize);
    //     }
    //   }
    // }
    if (src || gradientMapper[gradientType]) {
      const canvas = this.canvas.current;
      const ctx = canvas.getContext("2d");
      var tempImage = new Image();
      tempImage.crossOrigin = "Anonymous";
      tempImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          tempImage,
          0,
          0,
          tempImage.width,
          tempImage.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      };

      tempImage.src = src || gradientMapper[gradientType];
    }
  }

  onCanvasMouseDown({ pageX, pageY }) {
    this.setState({
      enablePicker: true
    });
    this.pickColorFromCanvas({ pageX, pageY });
  }

  onCanvasMouseUp() {
    this.setState({
      enablePicker: false
    });
  }

  onCanvasMouseOver({ pageX, pageY }) {
    const { enablePicker } = this.state;
    if (!enablePicker) {
      return;
    }

    this.pickColorFromCanvas({ pageX, pageY });
  }

  pickColorFromCanvas({ pageX, pageY }) {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");
    var viewportOffset = canvas.getBoundingClientRect();
    // these are relative to the viewport
    var offsetLeft = viewportOffset.left;
    var offsetTop = viewportOffset.top;

    const x = pageX - offsetLeft;
    const y = pageY - offsetTop;

    var imgData = ctx.getImageData(x, y, 1, 1).data;

    var red = imgData[0];
    var green = imgData[1];
    var blue = imgData[2];
    this.onColorChange({ red, green, blue });
  }
  onColorChange({ red, green, blue }) {
    const color = new Color({ red, green, blue });

    this.props.onChange({ color });
  }
  render() {
    const { gradientType, enablePicker } = this.state;
    const enablePickerClass = enablePicker ? "picker" : "";
    return (
      <div className="image-picker">
        <div className="color-type-selector">
          <p
            className="white"
            color="#ffffff"
            title="White (#FFFFFF)"
            onClick={this.onClickSwatch}
          />
          <p
            className="black"
            color="#000000"
            title="Black (#000000)"
            onClick={this.onClickSwatch}
          />
          <span className="separator">|</span>
          <img
            className={gradientType === "swatches" && "active"}
            src={swatches}
            alt="swatches"
            name="swatches"
            title="Swatches"
            onClick={this.onChangeGradientType}
          />
          <img
            className={gradientType === "linear" && "active"}
            src={gradient}
            alt="linear gradient"
            name="linear"
            title="Linear Gradient"
            onClick={this.onChangeGradientType}
          />
          <img
            className={gradientType === "circular" && "active"}
            src={gradientCircle}
            alt="circular gradient"
            name="circular"
            title="Circular Gradient"
            onClick={this.onChangeGradientType}
          />
        </div>
        <canvas
          width="280"
          height="280"
          className={`preview-canvas ${enablePickerClass}`}
          ref={this.canvas}
          onMouseDown={this.onCanvasMouseDown}
          onMouseMove={this.onCanvasMouseOver}
          onMouseUp={this.onCanvasMouseUp}
          onMouseOut={this.onCanvasMouseUp}
        />
        <input
          className="input-image"
          type="file"
          name="input-file"
          onChange={this.onImageChange}
        />
      </div>
    );
  }
}
