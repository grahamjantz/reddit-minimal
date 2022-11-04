import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: []
}

export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async (postId) => {
            const res = await fetch(`https://www.reddit.com/comments/${postId}.json`)
            const data = await res.json()
            return data
    }
)

export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        toggleComments (state, action) {
            state.posts.forEach((post) => {
                if (post.data.id = action.payload) {
                    if (post.data.showComments === false || post.data.showComments === null) {
                        post.data.showComments = true
                    } else if (post.data.showComments === true) {
                        post.data.showComments = false
                    }
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload
        })
    }
})

export const { toggleComments } = PostSlice.actions;

export const selectShowComments = (state) => state.postsList.posts.showComments;
export const selectComments = (state) => state.post.comments

export default PostSlice.reducer