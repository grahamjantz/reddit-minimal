import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import SubRedditsListReducer from '../features/SubredditsList/SubRedditsListSlice'
import PostsListReducer from '../features/PostsList/PostsListSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subreddits: SubRedditsListReducer,
    posts: PostsListReducer,
  },
});
