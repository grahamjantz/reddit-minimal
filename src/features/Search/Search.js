import React, { useState } from 'react'

const Search = () => {

  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className='search-bar'>
        <form>
          <input 
            type='text' 
            value={text} 
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
        <p>{text}</p>
    </div>
  )
}

export default Search