import React from 'react'
import './PostsList.css'

import Post from '../Post/Post'

const PostsList = () => {

    const posts = [
        {
            id: 1,
            upvotes: 49,
            username: 'grahamjantz',
            date_posted: '06/25/2022',
            title: 'Lorem Ipsum',
            img_src: '',
            comment_count: 14
        },
        {
            id: 2,
            upvotes: 49,
            username: 'grahamjantz',
            date_posted: '06/25/2022',
            title: 'Lorem Ipsum',
            img_src: '',
            comment_count: 14
        },
        {
            id: 3,
            upvotes: 49,
            username: 'grahamjantz',
            date_posted: '06/25/2022',
            title: 'Lorem Ipsum',
            img_src: '',
            comment_count: 14
        },
    ]

    return (
        <div className='posts-list'>
            {posts.map((post) => {
                return (
                    <Post 
                        key={post.id}
                        upvotes={post.upvotes}
                        username={post.username}
                        date_posted={post.date_posted}
                        title={post.title}
                        img_src={post.img_src}
                        comment_count={post.comment_count}
                    />
                )
            })}
        </div>
    )
}

export default PostsList