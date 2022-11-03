import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, generateId, selectPosts } from '../SubredditsList/SubRedditsListSlice'

import './PostsList.css'

import Post from '../Post/Post'

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
                        key={generateId()}
                        upvotes={post.data.ups}
                        username={post.data.author}
                        // date_posted={post.date_posted}
                        title={post.data.title}
                        img_src={post.data.url}
                        comment_count={post.data.num_comments}
                    />
                )
            })}
        </div>
    )
}

export default PostsList