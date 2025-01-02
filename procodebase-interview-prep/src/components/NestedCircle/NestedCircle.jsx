import React, { useState } from 'react'
import { Circle } from './circle'

export const NestedCircle = () => {
    const [num, setNum] = useState(0)
  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <input type="number" onChange={(e)=>setNum(e.target.value)}/>
        <Circle numbCircles={num}></Circle>
    </div>
  )
}
