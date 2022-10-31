import React from 'react'
import './Post.css'

import { FaRegCommentAlt } from 'react-icons/fa'
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";

const Post = ({ upvotes, username, date_posted, title, img_src, comment_count }) => {
  return (
    <div className='post global-box-shadow'>
        <div className='vote-count'>
            <TiArrowUpOutline size={25} className='vote-arrow up'/>
            <p>{upvotes}</p>
            <TiArrowDownOutline size={25} className='vote-arrow down'/>
        </div>
        <div className='post-main-content'>
            <h3>{title}</h3>
            <img src={img_src} alt=''/>
            <div className='post-footer'>
                <p className='username'>{username}</p>
                <p>{date_posted}</p>
                <div className='comments-tile'>
                    <FaRegCommentAlt size={15}/>
                    <p>{comment_count}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post