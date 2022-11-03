import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const subs = ['Home', 'mildlyinteresting', 'funny', 'space', 'Damnthatsinteresting', 'technology', 'tifu', 'AbsoluteUnits', 'books', 'wallstreetbets', 'dataisbeautiful', 'Cooking', 'blursedimages']

let num = 0

export const generateId = () => {
    num++
    return num
}

const subreddits = subs.map((subreddit) => {
    return {
      id: generateId(),
      title: subreddit,
      active: false,
      header_img: ''
    }
  })

const initialState = {
    subredditList: subreddits,
    currentSubreddit: '',
    posts: []
}

export const fetchPosts = createAsyncThunk(
    'subreddits/fetchPosts',
    async (subreddit) => {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    const data = await res.json()
    return data.data.children
    }
)

export const SubredditsListSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        toggleActive (state, action) {
            state.subredditList.map((subreddit) => {
                if (subreddit.title.toLowerCase() === state.currentSubreddit.toLowerCase()) {
                    subreddit.active = true
                } else {
                    subreddit.active = false
                }
                return 0
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.currentSubreddit = action.payload[0].data.subreddit
            })
    }
})

export const { toggleActive } = SubredditsListSlice.actions;

export const selectPosts = (state) => state.subreddits.posts;
export const selectCurrentSubreddit = (state) => state.subreddits.currentSubreddit;
export const selectSubReddits = (state) => state.subreddits.subredditList

export default SubredditsListSlice.reducer;