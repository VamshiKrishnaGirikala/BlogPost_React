import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getLoginStatus, logout } from "../store/usersSlice";

const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getLoginStatus());
    }, [isLoggedIn]);

    const onLogout = () => {
        dispatch(logout());
        navigate('/posts');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="posts" to="/posts">Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="users" to="/users">Users</Link>
                        </li>

                        {/* <li className="nav-item">
                            <Link className="nav-link" aria-current="users" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="users" to="/users">Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="users" to="/logout">Logout</Link>
                        </li> */}
                    </ul>
                </div>
                <ul className="navbar-nav">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="users" to="/account">Account</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" aria-current="users" onClick={onLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="users" to="/login">Login</Link>
                        </li>
                    )}

                </ul>
            </div>
        </nav>

    )
}

export default Navbar