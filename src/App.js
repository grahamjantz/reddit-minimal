import React from 'react';
import './App.css';

import Header from './features/Header/Header';
import PostsList from './features/PostsList/PostsList';
import SubredditsList from './features/SubredditsList/SubredditsList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='body'>
        <PostsList />
        <SubredditsList />
      </div>
    </div>
  );
}

export default App;
