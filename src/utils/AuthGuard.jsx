import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const isLoggedIn = useSelector(state => state.users.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn]);

    return children;
}

export default AuthGuard