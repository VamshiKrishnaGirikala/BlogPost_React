import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    status: null,
    posts: [],
    post: null,
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const url = "https://localhost:7189/api/Posts";
    const response = await axios.get(url);
    return response.data;
});

export const getPostById = createAsyncThunk('posts/getPostById', async (id) => {
    const url = `https://localhost:7189/api/Posts/${id}`;
    const response = await axios.get(url);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, payload }) => {
    const url = `https://localhost:7189/api/Posts/updatePost/${id}`;
    const response = await axios.put(url, payload);
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (payload) => {
    const url = `https://localhost:7189/api/Posts/createPost`;
    const response = await axios.post(url, payload);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const url = `https://localhost:7189/api/Posts/deletePost/${id}`;
    const response = await axios.delete(url);
    return response.data;
});

export const getComments = createAsyncThunk('comments/getComments', async (postId) => {
    const url = `https://jsonplaceholder.org/comments`;
    const response = await axios.get(url);
    return response.data.filter(comment => comment.postId === postId);
});

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getPostById.pending, (state) => {
                state.status = 'loading';
            }).addCase(getPostById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
            }).addCase(getPostById.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updatePost.pending, (state) => {
                state.status = 'loading';
            }).addCase(updatePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
            }).addCase(updatePost.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPost.pending, (state) => {
                state.status = 'loading';
            }).addCase(createPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
            }).addCase(createPost.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading';
            }).addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
            }).addCase(deletePost.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getComments.pending, (state) => {
                state.status = 'loading';
            }).addCase(getComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.post) {
                    state.post.comments = action.payload;
                }
            }).addCase(getComments.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})


export default postsSlice.reducer