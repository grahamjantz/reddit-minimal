import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPosts } from '../PostsList/PostsListSlice'

import './Search.css'

const Search = () => {

  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchPosts(text))
    setText('')
  }

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      <input 
        type='text' 
        value={text} 
        onChange={handleChange}
        placeholder='Search'
      />
    </form>
  )
}

export default Search