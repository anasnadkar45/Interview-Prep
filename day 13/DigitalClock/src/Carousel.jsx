import React, { useState } from 'react'

const images = [
    "https://media.geeksforgeeks.org/wp-content/uploads/20230306120634/unnamed.jpg",
    "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/c195038b6b053b89dbccf3affb559535?_a=AQAEuiZ",
    "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/c74e690053d5e6a9da2d8429a21fd610?_a=AQAEuiZ",
    "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/073bc4b17feb2983595af69e982945f1?_a=AQAEuiZ",
];

const Carousel = () => {
    const [activeImage, setActiveImage] = useState(0);
    const handelPrev = () => {
        if (activeImage === 0) {
            setActiveImage(images.length - 1);
        } else {
            setActiveImage((prev) => prev - 1);
        }
    }

    const handelNext = () => {
        if (activeImage === images.length - 1) {
            setActiveImage(0);
        } else {
            setActiveImage((prev) => prev + 1);
        }
    }
    return (
        <div className='flex gap-10 items-center'>
            <button onClick={handelPrev}>{'<'}</button>
            <img width={300} src={images[activeImage]} alt="" />
            <button onClick={handelNext}>{'>'}</button>
        </div>
    )
}

export default Carousel