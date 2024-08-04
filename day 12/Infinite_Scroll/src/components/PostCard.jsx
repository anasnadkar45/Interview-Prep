import React from 'react'

const PostCard = ({post}) => {
    return (
        <div key={post.id} className='border-2 border-black rounded-lg p-4'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}

export default PostCard