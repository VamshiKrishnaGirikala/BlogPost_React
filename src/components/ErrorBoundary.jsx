import React, { Component } from 'react';
import CustomModal from './CustomModal';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null, showModal: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error, showModal: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        this.logErrorToService(error, errorInfo);
    }

    logErrorToService(error, errorInfo) {
        console.error("Logged error:", error, errorInfo);
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <CustomModal
                    show={this.state.showModal}
                    handleClose={this.handleCloseModal}
                    title="An Error Occurred"
                    body={<div>{this.state.error?.message}</div>}
                />
            );
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