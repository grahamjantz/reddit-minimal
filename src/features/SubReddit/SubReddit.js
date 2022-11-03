import React from 'react'
import { useDispatch } from 'react-redux'

import './SubReddit.css'

import { FaCheck } from 'react-icons/fa'
import { fetchPosts } from '../PostsList/PostsListSlice'

const SubReddit = ({ title, active, onClick }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchPosts(title))
  }

  return (
    <div className={`subreddit ${active}`} onClick={handleClick}>
        <div className='check-box'>
            {active === true ? <FaCheck size={50}/> : false}
        </div>
        <h3>{title}</h3>
    </div>
  )
}

export default SubReddit