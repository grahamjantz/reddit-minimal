import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateId  } from '../SubredditsList/SubRedditsListSlice'
import ReactModal from 'react-modal'

import './PostsList.css'

import Post from '../Post/Post'
import { fetchPosts, selectPosts, fetchComments, toggleComments } from './PostsListSlice'

const PostsList = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPosts('home'))
    }, [dispatch])
    
    const posts = useSelector(selectPosts)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [postForModal, setPostForModal] = useState({
        data: {
            comments: [],
            showComments: false
        }
    })

    const renderModal = async (post) => {
        // dispatch(fetchComments(post.data.id))
        setPostForModal(post)
        setModalIsOpen(true)
    }

    let commentsForModal;
    posts.map((post) => {
        if (post.data.id === postForModal.data.id) {
            // console.log(post.data.comments)
            // console.log(postForModal.data.id)
            commentsForModal = post.data.comments
        }
        return commentsForModal
    })

    console.log(commentsForModal)

    // console.log(postForModal)

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <div className='posts-list'>
            {posts.map((post) => {
                return (
                    <Post
                        post={post} 
                        key={generateId()}
                        comments={post.data.comments}
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
                    post={postForModal}
                    comments={commentsForModal}
                    showComments={postForModal.data.showComments}
                    renderModal={null}
                />

            </ReactModal>
        </div>
    )
}

export default PostsList