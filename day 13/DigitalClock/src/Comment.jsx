import React, { useRef, useState } from 'react'

const Comment = ({ comment }) => {
    const [replyText, setReplyText] = useState('');
    const [activeCommentBox, setActiveCommentBox] = useState(false)
    const inputRef = useRef(null);

    const handleReply = () =>{
        setActiveCommentBox(true);
        setTimeout(()=>{
            inputRef.current.focus();
        },1)
    }
    const AddNewReply = () => {

    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='bg-slate-800 p-2 border rounded-md'>
                <div className='flex gap-2'>
                    <p>{comment.text}</p>
                    <button  onClick={handleReply}>Reply</button>
                </div>
                {activeCommentBox &&
                    <div>
                        <input type="text" />
                        <button>Save</button>
                    </div>}
            </div>
            <div className='ml-4'>
                {comment.children.map((item) => (
                    <Comment comment={item} />
                ))}
            </div>
        </div>
    )
}

export default Comment