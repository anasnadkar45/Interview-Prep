import React, { memo } from 'react'

const Search2 = ({onChange}) => {
    console.log('Search Rerender');
    
  return (
    <div>
        <input 
        type="text" 
        onChange={(e)=>onChange(e.target.value)}/>
    </div>
  )
}

export default memo(Search2)