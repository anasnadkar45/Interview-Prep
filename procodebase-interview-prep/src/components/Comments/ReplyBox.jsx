import React, { useState } from 'react';

export const ReplyBox = React.forwardRef(({ parentId, comments, setComments }, ref) => {
    const [replyInput, setReplyInput] = useState('');

    const handleReply = () => {
        if (replyInput.trim()) {
            const newId = Date.now();
            const newReply = {
                id: newId,
                comment: replyInput,
                parent: parentId,
                children: [],
            };

            setComments((prev) => {
                const updatedParent = {
                    ...prev.comments[parentId],
                    children: [...prev.comments[parentId].children, newId],
                };

                return {
                    comments: {
                        ...prev.comments,
                        [newId]: newReply,
                        [parentId]: updatedParent,
                    },
                };
            });

            setReplyInput('');
        }
    };

    return (
        <div>
            <textarea
                ref={ref}
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Enter Your Reply"
            />
            <button onClick={handleReply}>Add Reply</button>
        </div>
    );
});
