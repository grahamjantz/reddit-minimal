import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateId  } from '../SubredditsList/SubRedditsListSlice'
import ReactModal from 'react-modal'

import './PostsList.css'

import Post from '../Post/Post'
import { fetchPosts, selectPosts, toggleComments, selectCurrentPostComments, fetchModalPost, selectCurrentPost, selectCurrentPostShowComments } from './PostsListSlice'

const PostsList = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPosts('home'))
    }, [dispatch])
    
    const posts = useSelector(selectPosts)
    const currentPost = useSelector(selectCurrentPost)
    const currentPostComments = useSelector(selectCurrentPostComments)
    const currentPostShowComments = useSelector(selectCurrentPostShowComments)

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const renderModal = async (postId) => {
        dispatch(fetchModalPost(postId))
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        dispatch(toggleComments(currentPost.data.id))
    }

    return (
        <div className='posts-list'>
            {posts.map((post) => {
                return (
                    <Post
                        post={post} 
                        key={generateId()}
                        comments={currentPostComments}
                        showComments={post.data.showComments}
                        renderModal={renderModal}
                    />
                )
            })}
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <Post 
                    post={currentPost}
                    comments={currentPostComments}
                    showComments={currentPostShowComments}
                    renderModal={null}
                    currentPostShowComments={currentPostShowComments}
                />
            </ReactModal>
        </div>
    )
}

export default PostsList