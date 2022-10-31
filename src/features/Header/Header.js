import React from 'react'
import './Header.css'

import Search from '../Search/Search'
import { FaReddit } from 'react-icons/fa'

const Header = () => {
  return (
    <div className='header global-box-shadow'>
      <div className='logo-container'>
        <FaReddit size={50} className='reddit-logo'/>
        <h1>RedditMinimal</h1>
      </div>
        <Search />
    </div>
  )
}

export default Header