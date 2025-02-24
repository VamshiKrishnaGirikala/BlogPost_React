import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        this.logErrorToService(error, errorInfo);
    }

    logErrorToService(error, errorInfo) {
        console.error("Logged error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.error?.message}</h1>;
        }

        return this.props.children;
    }
}

const withErrorBoundary = (WrappedComponent) => (props) => (
    <ErrorBoundary>
        <WrappedComponent {...props} />
    </ErrorBoundary>
);

export default withErrorBoundary;