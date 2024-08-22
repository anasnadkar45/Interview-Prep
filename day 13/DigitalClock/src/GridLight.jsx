import React, { useEffect, useState } from 'react'

const Grid = [1, 1, 1, 1, 0, 1, 1, 1, 1];
const GridLight = () => {
    const [Arr, setArr] = useState([]);
    const [removeTiles, setRemoveTiles] = useState(false);
    const addToArr = (index) => {
        if (Arr.length < 9 && !Arr.includes(index)) {
            setArr((prevArr) => [...prevArr, index]);
        }
        console.log(Arr);
        if (Arr.length === 7){
            setRemoveTiles(true);
        }
    }

    useEffect(() => {
        let timer;
        if (removeTiles === true) {
            timer = setInterval(() => {
                setArr((prevArr) => {
                    if (prevArr.length > 0) {
                        return prevArr.slice(0, -1)
                    }else {
                        setRemoveTiles(false);
                        return prevArr;
                    }
                })
            }, 500);
        }

        return () => clearInterval(timer);
    }, [removeTiles])

    return (
        <div className='w-fit grid grid-cols-3 gap-4 grid-rows-3'>
            {Grid.map((value, index) => (
                value === 1 ? (
                    <div style={{ backgroundColor: Arr.includes(index) ? 'yellow' : 'white' }} onClick={() => addToArr(index)} key={index} className='w-24 h-24 bg-white border cursor-pointer'>
                    </div>
                ) : (
                    <div className='w-24 h-24'>

                    </div>
                )

            ))}
        </div>
    )
}

export default GridLight