import React, { useRef, useState } from 'react';
import { ReplyBox } from './ReplyBox';

export const CommentBox = ({ comment, allComments, setComments }) => {
    const [isReplyComment, setIsReplyComment] = useState(false);
    const ref = useRef();

    const handleReply = () => {
        setIsReplyComment(!isReplyComment);
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <div key={comment.id}>
                <h3>{comment.comment}</h3>
                <div>
                    <button
                        onClick={() => {
                            handleReply();
                            if (!isReplyComment) {
                                ref.current?.focus();
                            }
                        }}
                    >
                        {isReplyComment ? 'Cancel' : 'Reply'}
                    </button>
                    <button>Delete</button>
                </div>
            </div>

            {isReplyComment && <ReplyBox parentId={comment.id} comments={allComments} setComments={setComments} ref={ref} />}

            {comment.children.length > 0 && (
                <div style={{ marginLeft: '20px', borderLeft: '1px solid black', paddingLeft: '5px' }}>
                    {comment.children.map((childId) => (
                        <CommentBox key={childId} comment={allComments[childId]} setComments={setComments} allComments={allComments} />
                    ))}
                </div>
            )}
        </div>
    );
};
