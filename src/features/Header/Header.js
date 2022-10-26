import React from 'react'
import redditLogo from '../../images/reddit-logo.png'
import Search from '../Search/Search'

const Header = () => {
  return (
    <div className='header'>
        <img src={redditLogo} alt=''/>
        <h1>RedditMinimal</h1>
        <Search />
    </div>
  )
}

export default Header