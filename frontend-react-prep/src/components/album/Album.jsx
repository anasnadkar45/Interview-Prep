import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

export const Album = () => {
    const { loading, data } = useFetch('https://jsonplaceholder.typicode.com/photos');
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const albums = data.reduce((acc, curr) => {
        acc[curr.albumId] = acc[curr.albumId] || []
        acc[curr.albumId].push(curr);
        return acc
    }, {})

    console.log(selectedAlbum);

    return (
        <div>

            <h1>Album</h1>
            {loading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    Loading...
                </div>
            ) : (
                selectedAlbum && (
                    <div>
                        {albums[selectedAlbum].map((photo)=>(
                            <img src={photo.thumbnailUrl} alt="" />
                        ))}
                    </div>
                )
            )}

            {!selectedAlbum && (
                <div style={{ width: '90vw', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '10px' }}>
                    {Object.entries(albums).map((album) => (
                        <h1
                            key={album[0]}
                            style={{ border: '1px solid', padding: '20px' }}
                            onClick={() => setSelectedAlbum(Number(album[0]))}
                        >{album[0]}</h1>
                    ))}
                </div>
            )}
        </div>
    )
}
