const document = window.document;
export default class Utils {
  static toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static selectRange(node) {
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
  static clearRange() {
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
  static isCommandSupported(command) {
    return command && window.document.queryCommandSupported(command);
  }
  static copyStringToClipboard(str) {
    // Create new element
    var el = document.createElement("textarea");
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    if (this.isCommandSupported("copy")) {
      // Copy text to clipboard
      document.execCommand("copy");
      // Remove temporary element
      document.body.removeChild(el);
    }
  }
  static saveToLocalStorage(key, value) {
    if (localStorage && localStorage.setItem) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  static getFromLocalStorage(key, defaultValue) {
    if (localStorage && localStorage.getItem) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    }
  }
}
