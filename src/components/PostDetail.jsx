import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getPostById } from '../store/postsSlice';
import { useParams } from 'react-router-dom';
import { getUsers } from '../store/usersSlice';

const PostDetail = () => {
    const { post, status, error } = useSelector((state) => state.posts);
    const { users } = useSelector((state) => state.users);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const postId = parseInt(id);
                    await dispatch(getPostById(postId)).unwrap();
                    await dispatch(getComments(postId)).unwrap();
                    await dispatch(getUsers()).unwrap();
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, [dispatch, id]);
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>{error}</div>;
    }
    return (
        <div className='row justify-content-center'>
            <div className='col-6'>
                {status === 'succeeded' && post && <div>
                    <img className='w-100' src={post.image} style={{ height: '200px' }} alt="..." />
                    <div>
                        <p><strong>Title: </strong>{post.title}</p>
                        <p><strong>Description: </strong>{post.content}</p>
                        <div><strong>Created On: </strong>{post.updatedAt}</div>
                        <div><strong>Posted By: </strong>{users && users[post.userId] &&
                            users[post.userId].name}
                        </div>
                        <div>
                            <strong>Comments:</strong>
                            {post.comments && post.comments.map((comment) => (
                                <div key={comment.id}>
                                    {users && users[comment.userId] &&
                                        <p><strong>{users[comment.userId].name}</strong></p>}
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default PostDetail