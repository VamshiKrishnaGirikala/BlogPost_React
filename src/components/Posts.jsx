import { useDispatch, useSelector } from "react-redux"
import Post from "./Post"
import { useEffect, useState } from "react";
import { fetchPosts } from "../store/postsSlice";
import { Link } from "react-router-dom";
import { getLoginStatus } from "../store/usersSlice";

const Posts = () => {
    const { posts, status, error } = useSelector((state) => state.posts);
    const { isLoggedIn, loggedInUserDetails } = useSelector(state => state.users);
    const [isShowMyPosts, setIsShowMyPosts] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getLoginStatus());
    }, [isLoggedIn]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>{error}</div>;
    }
    const filteredPosts = posts && posts.filter(post => isShowMyPosts ? post.userId === loggedInUserDetails.id : post);
    return (
        <div className="container text-center">
            <div className="row">
                {isLoggedIn &&
                    <div className="d-flex justify-content-end my-3">
                        <button className="btn btn-outline-primary me-3" onClick={() => setIsShowMyPosts(prevState => !prevState)}>{isShowMyPosts ? 'Show all posts' : 'Show my posts'}
                        </button>
                        <Link className="btn btn-primary" to="/posts/createPost">Create Post </Link>
                    </div>
                }
                {filteredPosts && filteredPosts.map((post) => (
                    <div className="col-3 my-2" key={post.id}>
                        <Post post={post} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Posts