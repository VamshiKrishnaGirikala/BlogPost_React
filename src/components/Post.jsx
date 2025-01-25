import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <div className="card" style={{ height: '375px' }}>
            <img src={post.thumbnail} style={{ height: '150px' }} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-truncate">{post.content}</p>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/posts/${post.id}`} className="btn btn-primary">More Info</Link>
                </div>
            </div>
        </div>
    )
}

export default Post;