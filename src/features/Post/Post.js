import React from 'react'
import { upvote, downvote, fetchComments } from '../PostsList/PostsListSlice';

import './Post.css'

import Comment from './Comment/Comment';

import { FaRegCommentAlt } from 'react-icons/fa'
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import { useDispatch } from 'react-redux';

const Post = ({ post, comments, showComments }) => {

    const ranNum = () => {
        return Math.floor(Math.random() * 1000000)
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
    }
    
    if (post.data.pending === false || post.data.pending === null) {
        return (
            <div className='post global-box-shadow'>
                <div className='post-main-content'>
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
                            {post.data.score}
                        </p>
                        <TiArrowDownOutline 
                            size={25} 
                            className={`vote-arrow down ${post.data.canDownvote}`} 
                            onClick={sendDownvote}/>
                    </div>
                    <div className='post-body'>
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
                            {showComments === true ? (
                                comments.map((comment) => {
                                    return (
                                        <Comment 
                                            key={ranNum()}
                                            comment={comment}
                                        />
                                    )
                                })
                            ) : ''}
                        </ul>
                    </div>
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