import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateId  } from '../SubredditsList/SubRedditsListSlice'

import './PostsList.css'

import Post from '../Post/Post'
import { fetchPosts, selectPosts } from './PostsListSlice'

const PostsList = () => {

    const dispatch = useDispatch();
    const posts = useSelector(selectPosts)

    useEffect(() => {
        dispatch(fetchPosts('home'))
    }, [dispatch])

    return (
        <div className='posts-list'>
            {posts.map((post) => {
                return (
                    <Post
                        post={post} 
                        key={generateId()}
                        comments={post.data.comments}
                        showComments={post.data.showComments}
                    />
                )
            })}
        </div>
    )
}

export default PostsList