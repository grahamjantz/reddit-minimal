import React from 'react'
import './Comment.css'

const Comment = ({ commentBody, author }) => {
  return (
    <li className='comment'>
        <p>{commentBody}</p>
        <p className='comment-author'>{author}</p>
    </li>
  )
}

export default Comment