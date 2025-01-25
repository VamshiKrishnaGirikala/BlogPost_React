import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    status: null,
    posts: [],
    post: null,
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.org/posts');
    return response.data;
});

export const getPostById = createAsyncThunk('posts/getPostById', async (id) => {
    const response = await axios.get(`https://jsonplaceholder.org/posts/${id}`);
    return response.data;
});

export const getComments = createAsyncThunk('comments/getComments', async (postId) => {
    const response = await axios.get(`	https://jsonplaceholder.org/comments`);
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