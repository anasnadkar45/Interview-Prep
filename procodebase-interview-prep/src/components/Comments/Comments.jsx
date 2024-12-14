import React, { useState } from 'react';
import CommentsData from './Data/CommentsData.json';
import { CommentBox } from './CommentBox';

export const Comments = () => {
    const [comments, setComments] = useState(CommentsData);
    const [commentInput, setCommentInput] = useState('');

    const handleAddComment = () => {
        if (commentInput.trim()) {
            const newId = Object.keys(comments.comments).length + 1;
            const newComment = {
                id: newId,
                comment: commentInput,
                parent: null,
                children: [],
            };
            setComments({
                comments: {
                    ...comments.comments,
                    [newId]: newComment,
                },
            });
            setCommentInput('');
        }
    };


    return (
        <div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Submit</button>
                </div>

                <div>
                    {Object.entries(comments.comments)
                        .filter(([, comment]) => comment.parent === null)
                        .map(([, comment]) => (
                            <CommentBox key={comment.id} comment={comment} allComments={comments.comments} setComments={setComments}/>
                        ))}
                </div>
            </div>
        </div>
    );
};
