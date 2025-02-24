import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getComments, getPostById } from '../store/postsSlice';
import { useParams } from 'react-router-dom';
import { getLoginStatus, getUsers } from '../store/usersSlice';
import PostForm from './PostForm';

const PostDetail = () => {
    const [isEdit, setIsEdit] = useState(false);
    const { post, status, error } = useSelector((state) => state.posts);
    const { users, isLoggedIn, loggedInUserDetails } = useSelector((state) => state.users);
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

    useEffect(() => {
        dispatch(getLoginStatus());
    }, [isLoggedIn]);
    
    const handlePostFormDisplay = () => {
        setIsEdit(false);
    }

    const handleDeletePost = () => {
        dispatch(deletePost(post.id));
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>{error}</div>;
    }
    return (
        <div className='row justify-content-center'>
            {!isEdit ?
                <div className='col-6'>
                    {isLoggedIn && loggedInUserDetails?.id === post?.userId && (
                        <div className='justify-content-end d-flex'>
                            <button className='btn btn-primary my-3 me-3' onClick={() => setIsEdit(true)}>Edit Post</button>
                            <button className='btn btn-danger my-3' onClick={handleDeletePost}>Delete Post</button>
                        </div>)}
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
                                            <p><strong>{users[comment.userId].name}: </strong>{comment.comment}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}
                </div>
                : <PostForm isEdit={isEdit} post={post} handlePostFormDisplay={handlePostFormDisplay} />
            }
        </div>
    )
}

export default PostDetail