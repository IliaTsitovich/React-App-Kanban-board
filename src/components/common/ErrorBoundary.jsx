import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="error-screen" role="alert">
        <h1>Something went wrong</h1>
        <p>Your saved tasks are still in this browser. Reloading usually fixes this.</p>
        <button
          type="button"
          className="submit_button validated"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </main>
    );
  }
}
