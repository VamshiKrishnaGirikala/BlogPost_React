import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserById } from '../store/usersSlice';
const imagePlaceholderUrl = "https://dummyimage.com/800x430/5e917f/morbi-dictum.png&text=jsonplaceholder.org";
const UserDetail = () => {
    const { user } = useSelector((state) => state.users);
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const id = parseInt(userId);
                    await dispatch(getUserById(id)).unwrap();
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='row justify-content-center'>
            <div className='col-6'>
                {user && <div>
                    <img className='w-100' src={imagePlaceholderUrl} style={{ height: '200px' }} alt="..." />
                    <div>
                        <p><strong>Name: </strong>{user.firstname} {user.lastname}</p>
                        <p><strong>Phone: </strong>{user.phone}</p>
                        <div><strong>Email: </strong>{user.email}</div>
                        <div><strong>Company: </strong>{user.company.name}
                        </div>
                        <div><strong>Address: </strong>{user.address.street} {user.address.city} {user.address.zipcode}
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default UserDetail