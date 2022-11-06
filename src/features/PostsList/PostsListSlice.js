import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSubreddit: '',
    currentPostId: '',
    currentPost: {},
    currentPostComments: [],
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
    'postsList/fetchPosts',
    async (subreddit) => {
        const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
        const data = await res.json()
        const postsArr = await data.data.children
        return postsArr
    }
)

export const fetchModalPost = createAsyncThunk(
    'postsList/fetchModalPost',
    async (postId) => {
        const res = await fetch(`https://www.reddit.com/comments/${postId}.json`)
        const data = await res.json()
        return data
    }
)

export const searchPosts = createAsyncThunk(
    'postsList/searchPosts',
    async (query) => {
        const res = await fetch(`https://www.reddit.com/search.json?q=${query}`)
        const data = await res.json()
        return data.data.children
    }
)

export const fetchComments = createAsyncThunk(
    'postsList/fetchComments',
    async (postId) => {
        const res = await fetch(`https://www.reddit.com/comments/${postId}.json`)
        const data = await res.json()
        return data
    }
)

export const PostsListSlice = createSlice({
    name: 'postsList',
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
        },
        toggleComments (state, action) {
            state.posts.map((post) => {
                if (post.data.id === action.payload) {
                    post.data.showComments === false ? post.data.showComments = true : post.data.showComments = false
                }
            })
        },
        setCurrentPostId (state, action) {
            state.currentPostId = action.payload
        },
        setCurrentPost (state, action) {
            state.currentPost = action.payload
        },
        setCurrentPostComments (state, action) {
            state.currentPostComments = action.payload
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
                    post.data.comments = []
                    post.data.showComments = false
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
                state.currentPostId = action.payload[0].data.children[0].data.id
                state.currentPostComments = action.payload[1].data.children
                state.posts.map((post) => {
                    if (post.data.id === state.currentPostId) {
                        post.data.comments = action.payload[1].data.children
                    }
                })
            }) 
            .addCase(fetchModalPost.pending, (state, action) => {
                state.currentPost.data.pending = true
            })
            .addCase(fetchModalPost.fulfilled, (state, action) => {
                state.currentPost = action.payload[0].data.children[0]
                state.currentPostComments = action.payload[1].data.children
                state.currentPost.data.pending = false
                state.currentPost.data.canUpvote = true
                state.currentPost.data.canDownvote = true
                state.currentPost.data.comments = []
                state.currentPost.data.showComments = false
            })          
    }
})

export const { upvote, downvote, toggleComments, setCurrentPostId, setCurrentPostComments, setCurrentPost } = PostsListSlice.actions;

export const selectPosts = (state) => state.postsList.posts;
export const selectCurrentSubreddit = (state) => state.postsList.currentSubreddit;
export const selectCurrentPostId = (state) => state.postsList.currentPostId;
export const selectCurrentPost = (state) => state.postsList.currentPost
export const selectCurrenPostComments = (state) => state.postsList.currentPostComments

export default PostsListSlice.reducer;