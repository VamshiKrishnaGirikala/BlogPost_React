import { setError } from "../store/globalErrorSlice";

const errorMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        console.error('Global Error:', action.error.message);
        store.dispatch(setError(action.error.message));
    }
    return next(action);
};

export default errorMiddleware;