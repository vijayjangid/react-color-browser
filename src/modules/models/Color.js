import Utils from "../helpers/Utils";
class Color {
  red = 0;
  green = 0;
  blue = 0;
  static fromHex(hex) {
    const { red, green, blue } = this;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? new this({
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16)
        })
      : new this({ red, green, blue });
  }
  constructor({ red = 0, green = 0, blue = 0 } = {}) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  update({ key, value }) {
    this[key] = Number(value);
  }
  formatToTwoDigits(input) {
    return input.length < 2 ? `0${input}` : input;
  }
  toHex(input) {
    const rgb = input || this;
    return `#${Object.values(rgb)
      .map(x => this.formatToTwoDigits(x.toString(16)))
      .join("")}`;
  }
  toPlainObject() {
    const { red, green, blue } = this;
    return {
      red,
      green,
      blue
    };
  }
  toArray() {
    return Object.keys(this).map(e => ({
      name: Utils.toTitleCase(e),
      key: e,
      value: this[e]
    }));
  }
  getShades(input) {
    const { red, green, blue } = this;
    const [left, right] = [
      Math.min(red, green, blue),
      Math.min(255 - red, 255 - green, 255 - blue)
    ];
    const count = Number(input) + 1;
    const shades = new Array(count).fill(this.toHex());

    for (let i = 1; i < count; i++) {
      const factor =
        i < count / 2
          ? (-(count / 2 - i) * left * 2) / count
          : ((i / 2) * right * 2) / count;

      if (factor === 0) {
        // ignore the original color
        continue;
      }
      shades[i - 1] = this.toHex({
        red: Math.ceil(red + factor),
        green: Math.ceil(green + factor),
        blue: Math.ceil(blue + factor)
      });
    }
    shades.length = input; // restrict shades to be no more than input
    return shades;
  }
  getInvertColor() {
    return this.red * 0.299 + this.green * 0.587 + this.blue * 0.114 > 186
      ? "#000000"
      : "#FFFFFF";
  }
}
export default Color;

// toHSL() {
//   let r = this.red / 255;
//   let g = this.green / 255;
//   let b = this.blue / 255;

//   var max = Math.max(r, g, b),
//     min = Math.min(r, g, b);
//   var h,
//     s,
//     l = (max + min) / 2;

//   if (max === min) {
//     h = s = 0; // achromatic
//   } else {
//     var d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//     switch (max) {
//       case r:
//         h = (g - b) / d + (g < b ? 6 : 0);
//         break;
//       case g:
//         h = (b - r) / d + 2;
//         break;
//       case b:
//         h = (r - g) / d + 4;
//         break;
//       default:
//         break;
//     }

//     h /= 6;
//   }

//   return [h, s, l];
// }
// hslToRgb(h, s, l) {
//   var r, g, b;

//   if (s === 0) {
//     r = g = b = l; // achromatic
//   } else {
//     function hue2rgb(p, q, t) {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     }

//     var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     var p = 2 * l - q;

//     r = hue2rgb(p, q, h + 1 / 3);
//     g = hue2rgb(p, q, h);
//     b = hue2rgb(p, q, h - 1 / 3);
//   }
//   return {
//     red: Math.ceil(r * 255),
//     green: Math.ceil(g * 255),
//     blue: Math.ceil(b * 255)
//   };
// }
// getShades2(count) {
//   const [h, s, l] = this.toHSL();
//   const range = Math.min(10 - l, l);
//   const step = range / count;
//   const shades = [];
//   for (let i = 1; i <= count; i++) {
//     const factor = i <= count / 2 ? i * step : -i * step;
//     shades.push(this.toHex(this.hslToRgb(h, s, l + factor)));
//   }
//   shades.length = count;
//   return shades;
// }
