import React, { useState } from 'react'

const CommentDisplay = ({ comments }) => {
    const [replies, setReplies] = useState([])
    const [replyInput, setReplyInput] = useState()

    function addReply(id) {
        if (replyInput.length > 0) {
            setReplies([...replies, replyInput]);
            setReplyInput('');
        }
        console.log(replies);
    }
    return (
        <div>
            {comments.map((comment, index) => (
                <form key={index} onSubmit={(e) => { e.preventDefault(); addReply(index); }}>
                    <div className='comment-card'>
                        <div>
                            <input
                                type="text"
                                value={replyInput}
                                onChange={(e)=>e.target.value}
                            />
                            <p>{comment}</p>
                        </div>
                        <button type='submit'>reply</button>
                    </div>
                </form>
            ))}
        </div>
    )
}

export default CommentDisplay