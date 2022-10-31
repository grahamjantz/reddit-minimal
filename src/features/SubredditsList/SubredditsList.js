import React from 'react'
import './SubredditsList.css'

import SubReddit from '../SubReddit/SubReddit'

const SubredditsList = () => {

  const subreddits = [
    {
      id: 1,
      title: 'Home',
      active: true,
    },
    {
      id: 2,
      title: 'AskReddit',
      active: false,
    },
    {
      id: 3,
      title: 'funny',
      active: false,
    },
  ]

  return (
    <div className='subreddit-list global-box-shadow'>
      <h3 className='subreddits-title'>SubReddits</h3>
      <div className='subreddits'>
        {subreddits.map((sub) => {
          return (
            <SubReddit 
              key={sub.id}
              title={sub.title}
              active={sub.active}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SubredditsList