import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateId  } from '../SubredditsList/SubRedditsListSlice'

import './PostsList.css'

import Post from '../Post/Post'
import { fetchComments, fetchPosts, selectPosts } from './PostsListSlice'

const PostsList = () => {

    // const posts = [
    //     {
    //         id: 1,
    //         upvotes: 49,
    //         username: 'grahamjantz',
    //         date_posted: '06/25/2022',
    //         title: 'Lorem Ipsum',
    //         img_src: '',
    //         comment_count: 14
    //     },
    //     {
    //         id: 2,
    //         upvotes: 49,
    //         username: 'grahamjantz',
    //         date_posted: '06/25/2022',
    //         title: 'Lorem Ipsum',
    //         img_src: '',
    //         comment_count: 14
    //     },
    //     {
    //         id: 3,
    //         upvotes: 49,
    //         username: 'grahamjantz',
    //         date_posted: '06/25/2022',
    //         title: 'Lorem Ipsum',
    //         img_src: '',
    //         comment_count: 14
    //     },
    // ]

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
                    />
                )
            })}
        </div>
    )
}

export default PostsList