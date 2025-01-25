import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/usersSlice';

const Users = () => {
    const { users, status, error } = useSelector((state) => state.users);
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
            {users && users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    )
}

export default Users