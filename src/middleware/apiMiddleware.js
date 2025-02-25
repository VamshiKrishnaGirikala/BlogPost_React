import { setError, startLoading, stopLoading } from "../store/globalStateSlice";

const apiMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/pending')) {
        store.dispatch(startLoading());
    } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
        store.dispatch(stopLoading());
    }
    if (action.type.endsWith('/rejected')) {
        console.error('Global Error:', action.error.message);
        store.dispatch(setError(action.error.message));
    }
    return next(action);
};

export default apiMiddleware;