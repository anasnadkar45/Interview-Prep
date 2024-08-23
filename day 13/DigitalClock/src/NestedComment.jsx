import React, { useState } from 'react'
import Comment from './Comment';


const NestedComment = () => {
    const [input, setInput] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            text: 'Comment 1',
            children: [
                {
                    id: 2,
                    text: 'Reply 1',
                    children: [
                        {
                            id: 3,
                            text: 'Nested Reply 1',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            text: 'Comment 2',
            children: [],
        }
    ]);

    const newComment = (text) => {
        return {
            id: new Date().getTime(),
            text: text,
            children: []
        }
    }
    const handleNewComment = () => {
        setComments([...comments, newComment(input)])
        setInput('');
    }

    console.log(comments);

    const addReply = () => {

    }

    return (
        <div>
            <h1>Comments</h1>
            {/* Add Comment */}
            <div className='flex gap-2'>
                <input
                    type="text"
                    placeholder='Add Comment'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleNewComment}>Add Comment</button>
            </div>

            {/* All Comments */}
            <div className='flex flex-col gap-2'>
                {comments.map((item) => (
                    <Comment key={item.id} comment={item} />
                ))}
            </div>
        </div>
    )
}

export default NestedComment