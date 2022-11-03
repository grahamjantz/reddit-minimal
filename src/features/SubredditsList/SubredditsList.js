import React, { useEffect } from 'react'

import './SubredditsList.css'

import SubReddit from '../SubReddit/SubReddit'
import { useDispatch, useSelector } from 'react-redux'
import { selectSubReddits, toggleActive } from './SubRedditsListSlice'
import { selectCurrentSubreddit } from '../PostsList/PostsListSlice'



const SubredditsList = () => {

  const dispatch = useDispatch()
  const subreddits = useSelector(selectSubReddits)
  const selectedCurrentSubreddit = useSelector(selectCurrentSubreddit)

  useEffect(() => {
    dispatch(toggleActive(selectedCurrentSubreddit))
  }, [selectedCurrentSubreddit, dispatch])

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