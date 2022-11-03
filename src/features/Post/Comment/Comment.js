import React from 'react'

const Comment = ({ comment }) => {
  return (
    <li className='comment'>
        <h3>{comment.data.children[0].data.body}</h3>
    </li>
  )
}

export default Comment