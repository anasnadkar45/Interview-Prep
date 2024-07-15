import React, { useState } from 'react'

const Folder = ({ explorer }) => {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible:false,
        isFolder:null
    });

    const handleNewFolder = (e)=> {
        e.stopPropagation();   
    }



    if (explorer.isFolder) {
        return (
            <div>
                <div className='folder' onClick={() => setExpand(!expand)}>
                    <span >
                        📁 {explorer.name}
                    </span>

                    <div>
                        <button onClick={(e)=>handleNewFolder(e)}>Folder ➕</button>
                        <button>File ➕</button>
                    </div>
                </div>

                <div style={{ display: expand ? 'block' : 'none', marginLeft: '10px' }}>
                    {explorer.items.map((exp) => (
                        <Folder explorer={exp} key={exp.id} />
                    ))}
                </div>
            </div>
        )
    } else {
        return <span className='file'>📄 {explorer.name}</span>
    }
}

export default Folder