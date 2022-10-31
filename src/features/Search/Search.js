import React, { useState } from 'react'
import './Search.css'

const Search = () => {

  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <form className='search-bar'>
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