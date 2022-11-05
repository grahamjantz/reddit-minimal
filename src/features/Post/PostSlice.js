import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPostId: '',
    comments: [],
    showComments: false
}

export const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    }
})

export const selectShowComments = (state) => state.post.showComments;
export const selectComments = (state) => state.post.comments

export default PostSlice.reducer