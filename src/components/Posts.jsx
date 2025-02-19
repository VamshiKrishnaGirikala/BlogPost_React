import { useDispatch, useSelector } from "react-redux"
import Post from "./Post"
import { useEffect } from "react";
import { fetchPosts } from "../store/postsSlice";
import { Link } from "react-router-dom";

const Posts = () => {
    const { posts, status, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (posts.length === 0) {
            dispatch(fetchPosts());
        }
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>{error}</div>;
    }
    return (
        <div className="container text-center">
            <div className="row">
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary" to="/posts/createPost">Create Post</Link>
                </div>
                {posts && posts.map((post) => (
                    <div className="col-3 my-2" key={post.id}>
                        <Post post={post} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Posts