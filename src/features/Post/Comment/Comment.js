import React from 'react'
import './Comment.css'

const Comment = ({ comment }) => {
  return (
    <li className='comment'>
        <p>{comment.data.body}</p>
        <p className='comment-author'>{comment.data.author}</p>
    </li>
  )
}

export default Comment