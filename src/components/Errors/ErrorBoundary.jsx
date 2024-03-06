/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ErrorScreen from "./ErrorScreen";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }

    return this.props.children;
  }
}
