import React, { useEffect, useState } from 'react';

const Api = 'https://jsonplaceholder.typicode.com/photos';

export const PhotoAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isAlbum, setIsAlbum] = useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(Api);
      const result = await response.json();
      // Group the photos by albumId after fetching
      const groupedPhotos = result.reduce((acc, photo) => {
        acc[photo.albumId] = acc[photo.albumId] || [];
        acc[photo.albumId].push(photo);
        return acc;
      }, {});
      setAlbums(groupedPhotos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    setIsAlbum(false);
  };

  const handleBackClick = () => {
    setIsAlbum(true);
    setSelectedAlbum(null);
  };

  return (
    <div style={{ padding: '10px' }}>
      <h1>Photo Album</h1>
      {isAlbum ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {Object.entries(albums).map(([albumId, albumPhotos]) => (
            <div
              key={albumId}
              style={{
                width: '100%',
                border: '1px solid black',
                backgroundColor: 'cyan',
                borderRadius: '10px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleAlbumClick(albumId)}
            >
              <h2>Album {albumId}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={handleBackClick} style={{ marginBottom: '10px' }}>
            Back to Albums
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {albums[selectedAlbum].map((photo) => (
              <div
                key={photo.id}
                style={{
                  border: '1px solid black',
                  backgroundColor: 'cyan',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <img src={photo.thumbnailUrl} alt={photo.title} style={{ width: '100%', borderRadius: '5px' }} />
                <p>{photo.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
