import React from "react";

class ErrorBoundary extends React.Component<
  {},
  {
    hasError: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error);
    console.log(info);
  }

  render() {
      if(this.state.hasError) {
          return <h2>Something went wrong....</h2>
      }

      return this.props.children;
  }
}

export default ErrorBoundary;
