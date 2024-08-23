import React, { useEffect, useState } from 'react'

const Album = () => {
    const [photos, setPhotos] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const fetchPhotos = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=1000`);
        const response = await data.json();
        setPhotos(response);

        const filteredAlbums = response.reduce((acc, photo) => {
            acc[photo.albumId] = acc[photo.albumId] || [];
            acc[photo.albumId].push(photo);
            return acc;
        }, {})
        
        setAlbums(filteredAlbums)
    }
    useEffect(() => {
        fetchPhotos();
    }, [])
    // console.log(photos);
    console.log(albums);
    

    const first10Albums = Object.keys(albums).slice(0, 10);
    console.log(first10Albums)



    return (
        <div>
            {/* Show All the Albums */}
            <div>
                {!selectedAlbum ? (
                    first10Albums.map((albumId) => (
                        <div onClick={() => setSelectedAlbum(albumId)} key={albumId}>
                            <h1>Album {albumId}</h1>
                        </div>
                    ))
                ) : (
                    <div>
                        <button onClick={() => setSelectedAlbum(null)}>Back To Albums</button>
                        {albums[selectedAlbum].map((image) => (
                            <div key={image.id} onClick={() => setSelectedPhoto(image)} className='border text-center p-4 cursor-pointer'>
                                <img src={image.thumbnailUrl} loading='lazy' alt={image.title} />
                                <h1>{image.title}</h1>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedPhoto && (
                <div className='fixed inset-0 bg-black/75 flex justify-center items-center'>
                    <div className='w-fit bg-white p-4 rounded-md'>
                        <img loading='lazy' src={selectedPhoto.url} alt={selectedPhoto.title} />
                        <button onClick={()=>setSelectedPhoto(null)} className='mt-4 p-2 bg-red-500 text-white rounded'>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Album