import React, { useState } from 'react'
import { FaRegHeart, FaShareAlt, FaHeart } from 'react-icons/fa';

const PostCard = ({ title, body }) => {
    const [like, setLike] = useState(false);
    function handleClick(){
        setLike(!like);
    }
    return (
        <div className='postCard'>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className='card-bottom'>
                <button className="action-button" onClick={handleClick}>
                    {
                        like ? (<FaHeart style={{ color: 'red' }} />) : (<FaRegHeart className="heart" />)
                    }

                </button>
            </div>
        </div>
    )
}

export default PostCard