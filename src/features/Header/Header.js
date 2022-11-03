import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../PostsList/PostsListSlice'

import './Header.css'

import Search from '../Search/Search'
import { FaReddit } from 'react-icons/fa'

const Header = () => {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(fetchPosts('home'))
  }

  return (
    <div className='header global-box-shadow'>
      <div className='logo-container' onClick={handleClick}>
        <FaReddit size={50} className='reddit-logo'/>
        <h1>RedditMinimal</h1>
      </div>
        <Search />
    </div>
  )
}

export default Header