import React from 'react'
import './SubReddit.css'

import { FaCheck } from 'react-icons/fa'

const SubReddit = ({ title, active }) => {
  return (
    <div className={`subreddit ${active}`}>
        <div className='check-box'>
            {active === true ? <FaCheck size={50}/> : false}
        </div>
        <h3>{title}</h3>
    </div>
  )
}

export default SubReddit