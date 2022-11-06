import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateId  } from '../SubredditsList/SubRedditsListSlice'
import ReactModal from 'react-modal'

import './PostsList.css'

import Post from '../Post/Post'
import { fetchPosts, selectPosts, fetchComments, toggleComments, setCurrentPostId, selectCurrentPostId, setCurrentPostComments, selectCurrenPostComments, setCurrentPost, fetchModalPost, selectCurrentPost } from './PostsListSlice'

const PostsList = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPosts('home'))
    }, [dispatch])
    
    const posts = useSelector(selectPosts)
    const currentPostId = useSelector(selectCurrentPostId)
    const currentPost = useSelector(selectCurrentPost)
    const currentPostComments = useSelector(selectCurrenPostComments)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [postForModal, setPostForModal] = useState()

    const renderModal = async (postId) => {
        setModalIsOpen(true)
        dispatch(fetchModalPost(postId))
        setPostForModal(currentPost)
        // posts.map((post) => {
        //     if (post.data.id === currentPostId) {
        //         dispatch(setCurrentPost(post))
        //         dispatch(setCurrentPostComments(postId.data.comments))
        //         console.log(post.data.comments)
        //     }
        // })
    }


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
                    post={currentPost}
                    comments={currentPostComments}
                    // showComments={postForModal ? postForModal.data.showComments: ''}
                    renderModal={null}
                />
            </ReactModal>
        </div>
    )
}

export default PostsList