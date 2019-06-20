import React from "react";
import "./style.css";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>Oops! Something went wrong :(</h2>
          <p>drop me a message about this...</p>
        </div>
      );
    }

    return this.props.children;
  }
}
