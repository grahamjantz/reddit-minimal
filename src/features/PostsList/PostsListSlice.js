import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentSubreddit: '',
    posts: []
}

const pendingPosts = {
    posts: [
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
        {data: {pending: true},},
    ]
}

const rejectedPosts = {
    posts: [
        {data: {id: 1,title: 'Unable to fetch posts!',},},
        {data: {id: 1,title: 'Unable to fetch posts!',},},
        {data: {id: 1,title: 'Unable to fetch posts!',},},
        {data: {id: 1,title: 'Unable to fetch posts!',},},
        {data: {id: 1,title: 'Unable to fetch posts!',},},
        {data: {id: 1,title: 'Unable to fetch posts!',},},
    ]
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (subreddit) => {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    const data = await res.json()
    return data.data.children
    }
)

export const searchPosts = createAsyncThunk(
    'posts/searchPosts',
    async (query) => {
        const res = await fetch(`https://www.reddit.com/search.json?q=${query}`)
        const data = await res.json()
        return data.data.children
    }
)

export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async(postId) => {
        const res = await fetch(`https://www.reddit.com/comments/${postId}.json`)
        const data = await res.json()
        console.log(data)
        return data
    }
)

export const PostsListSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        upvote (state, action) {
            state.posts.forEach((post) => {
                if (post.data.title === action.payload && post.data.canUpvote === true ) {
                    post.data.score++
                    post.data.canUpvote = false
                    post.data.canDownvote = true
                } 
                return post
            })
        },
        downvote (state, action) {
            state.posts.forEach((post) => {
                if (post.data.title === action.payload && post.data.canDownvote === true) {
                    post.data.score--
                    post.data.canUpvote = true
                    post.data.canDownvote = false
                }
                return post
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.currentSubreddit = action.payload[0].data.subreddit
                state.posts.map((post) => {
                    post.data.pending = false
                    post.data.canUpvote = true
                    post.data.canDownvote = true
                    post.data.comments =[]
                    return 0
                })
            })
            .addCase(fetchPosts.pending, (state, action) => {
                state.posts = pendingPosts.posts
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts = rejectedPosts.posts
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.currentSubreddit = ''
                state.posts.map((post) => {
                    return post.data.pending = false
                })
            })
            .addCase(searchPosts.pending, (state) => {
                state.posts = pendingPosts.posts
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.posts.forEach((post) => {
                    post.data.comments = action.payload
                })
            })
    }
})

export const { upvote, downvote } = PostsListSlice.actions;

export const selectPosts = (state) => state.posts.posts;
export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;

export default PostsListSlice.reducer;