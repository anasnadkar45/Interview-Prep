import React, { useState } from 'react'

const CommentBox = ({comments,setComments}) => {
    const [commentInput, setCommentInput] = useState('');
    

    async function addComment() {
        if (commentInput.length > 0) {
            setComments([...comments, commentInput]);
            setCommentInput('');
        }
        console.log(comments);
    }
    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); addComment(); }}>
                <input
                    type="text"
                    value={commentInput}
                    onChange={(e)=> setCommentInput(e.target.value)}
                />
                <button type='submit'>Add Comment</button>
            </form>
        </div>
    )
}

export default CommentBox