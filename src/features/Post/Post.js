import React, { useEffect, useState } from 'react'
import { upvote, downvote, fetchComments, selectPosts } from '../PostsList/PostsListSlice';

import './Post.css'

import Comment from './Comment/Comment';

import { FaRegCommentAlt } from 'react-icons/fa'
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';

const Post = ({ post, comments }) => {

    const [showComments, setShowComments] = useState(false)

    const posts = useSelector(selectPosts)

    const ranNum = () => {
        return Math.floor(Math.random() * 10000)
    }
    const dispatch = useDispatch();

    const sendUpvote = () => {
        dispatch(upvote(post.data.title))
    }

    const sendDownvote = () => {
        dispatch(downvote(post.data.title))
    }

    const handleClick = () => {
        dispatch(fetchComments(post.data.id))
        setShowComments(true)
    }

    // useEffect(() => {
        // }, [showComments])
        
    // dispatch(fetchComments(post.data.id))
    // useEffect(() => {
    //     dispatch(fetchComments(post.data.id))
    // }, [dispatch])

    if (post.data.pending === false || post.data.pending === null) {
        return (
            <div className='post global-box-shadow'>
                <div className='vote-count'>
                    <TiArrowUpOutline 
                        size={25} 
                        className={`vote-arrow up ${post.data.canUpvote}`} 
                        onClick={sendUpvote}
                    />
                    <p style={
                        {
                            color: (post.data.canUpvote === false ? 'green' : '' || post.data.canDownvote === false ? 'red' : '')
                        }
                    }>
                        {post.data.ups}
                    </p>
                    <TiArrowDownOutline 
                        size={25} 
                        className={`vote-arrow down ${post.data.canDownvote}`} 
                        onClick={sendDownvote}/>
                </div>
                <div className='post-main-content'>
                    <h3>{post.data.title}</h3>
                    <img src={post.data.url} alt=''/>
                    <p className='post-body'>{post.data.selftext}</p>
                    <div className='post-footer'>
                        <p className='username'>{post.data.author}</p>
                        <p></p>
                        <div className='comments-tile' onClick={handleClick}>
                            <FaRegCommentAlt size={15}/>
                            <p>{post.data.num_comments}</p>
                        </div>
                    </div>
                    <ul className='post-comments-list'>
                        {comments.map((comment) => {
                            return (
                                <Comment 
                                    comment={comment}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
          )
    } else {
        return (
            <div className='post pending global-box-shadow '>
                <div className='vote-count'>
                    <TiArrowUpOutline size={25} className='vote-arrow up'/>
                    <TiArrowDownOutline size={25} className='vote-arrow down'/>
                </div>
                <div className='post-main-content'>
                    <div className='post-footer'>
                        <div className='comments-tile'>
                            <FaRegCommentAlt size={15}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
}

export default Post