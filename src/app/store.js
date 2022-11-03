import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import SubRedditsListReducer from '../features/SubredditsList/SubRedditsListSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subreddits: SubRedditsListReducer
  },
});
