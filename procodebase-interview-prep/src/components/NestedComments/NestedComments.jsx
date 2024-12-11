import React, { useState } from 'react'
import commentsData from './data/commentsData.json'
import { CommentBox } from './CommentBox'

export const NestedComments = () => {
    const [comments, setComments] = useState(commentsData)
  return (
    <div style={{padding:'10px'}}>
        <CommentBox comment={comments.comments[1]} allComments={comments.comments}/>
    </div>
  )
}
