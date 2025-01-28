import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/usersSlice';
import { Link } from 'react-router-dom';

const Users = () => {
    const { users, status, error } = useSelector((state) => state.users);
    const usersList = Object.values(users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());

    }, [dispatch]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h3>All Users</h3>
            <div className="container text-center">
                <div className="row">
                    {usersList && usersList.map((user) => (
                        <div className="col-3 my-2" key={user.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <img className='user-profile-picture-icon' src="https://dummyimage.com/800x430/5e917f/morbi-dictum.png&text=jsonplaceholder.org" alt="" />
                                        <h5 className="card-title mt-2">{user.name}</h5>
                                    </div>
                                    <p className="card-text"><strong>Username: </strong>{user.username}</p>
                                    <p className="card-text"><strong>Email: </strong>{user.email}</p>
                                    <p className="card-text"><strong>Phone: </strong>{user.phone}</p>
                                    <div className='text-center'>
                                        <Link to={`/users/${user.id}`} className="btn btn-primary">More Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users