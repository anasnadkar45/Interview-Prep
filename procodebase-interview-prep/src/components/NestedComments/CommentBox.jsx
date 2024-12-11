import React, { useState } from 'react'
import { ReplyComment } from './ReplyComment'

export const CommentBox = ({ comment, allComments }) => {
    const [isReplyComment, setIsReplyComment] = useState(false)
    const handleReply = () => {
        setIsReplyComment(!isReplyComment)
    }
    return (
        <div>
            <div key={comment.id}>
                <h3>{comment.value}</h3>
                <div>
                    <button onClick={handleReply}>{isReplyComment ? "Cancle" : "Reply"}</button>
                    <button>Delete</button>
                </div>
            </div>

            {isReplyComment && <ReplyComment />}

            <div style={{ paddingInline: '20px', borderLeft: '1px solid black' }}>
                {comment.children.map((childId)=> (
                    <CommentBox comment={allComments[childId]} allComments={allComments}/>
                ))}
            </div>
        </div>
    )
}
