import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Do something with error
    console.log(`ErrorBoundary caught ${error}`, info.componentStack);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="error-boundary">
            <h2>Uh Oh!</h2>
            <p>
              There was an error with this listing.{" "}
              <Link to="/">Click here</Link>to return to the Home page.
            </p>
          </div>
        </>
      );
    }

    // If there is no error, do nothing; show the wrapped children
    return this.props.children;
  }
}

export default ErrorBoundary;
