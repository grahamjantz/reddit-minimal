import {  createSlice } from "@reduxjs/toolkit";

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
}

export const SubredditsListSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        toggleActive (state, action) {
            state.subredditList.map((subreddit) => {
                if (subreddit.title.toLowerCase() === action.payload.toLowerCase()) {
                    subreddit.active = true
                } else {
                    subreddit.active = false
                }
                return 0
            })
        }
    },
    extraReducers: () => {
        
    }
})

export const { toggleActive } = SubredditsListSlice.actions;

export const selectSubReddits = (state) => state.subreddits.subredditList

export default SubredditsListSlice.reducer;