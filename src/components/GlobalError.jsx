import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../store/globalErrorSlice';

const GlobalError = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.globalError.errorMessage);

    if (!errorMessage) return null;

    return (
        <div className="alert alert-danger" role="alert">
            {errorMessage}
            <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => dispatch(clearError())}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default GlobalError;