

import { IconButton, ImageList, ImageListItem, ImageListItemBar, Button } from '@mui/material';
import React, { useState } from 'react';
import { useValue } from '../context/ContextProvider';
import { Cancel } from '@mui/icons-material';
import deleteFile from '../firebase/deleteFile';

const ImagesList = () => {
  const {
    state: { images, currentUser },
    dispatch,
  } = useValue();

  const [previewImages, setPreviewImages] = useState([]);

  const handleDelete = async (image) => {
    dispatch({ type: 'DELETE_IMAGE', payload: image });
    const imageName = image?.split(`${currentUser?.id}%2F`)[1]?.split('?')[0];

    try {
      await deleteFile(`rooms/${currentUser?.id}/${imageName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newPreviewImages = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewImages.push(e.target.result);
        if (newPreviewImages.length === files.length) {
          setPreviewImages((prev) => [...prev, ...newPreviewImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePreview = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* File Input */}
      <Button variant="contained" component="label">
        Upload Images
        <input type="file" multiple hidden accept="image/*" onChange={handleFileChange} />
      </Button>

      {/* Preview Images */}
      <ImageList
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 16,
        }}
      >
        {previewImages.map((image, index) => (
          <ImageListItem
            key={index}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '1 / 1', // Maintain a square aspect ratio
              borderRadius: 4,
            }}
          >
            <img
              src={image}
              alt="Preview"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <ImageListItemBar
              position="top"
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={() => handleRemovePreview(index)}
                >
                  <Cancel />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Uploaded Images */}
      <ImageList
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 16,
        }}
      >
        {images.map((image, index) => (
          <ImageListItem
            key={index}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '1 / 1', // Maintain a square aspect ratio
              borderRadius: 4,
            }}
          >
            <img
              src={image}
              alt="Uploaded"
              loading="lazy"
              style={{ width: '100%', height: '50%', objectFit: 'cover' }}
            />
            <ImageListItemBar
              position="top"
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={() => handleDelete(image)}
                >
                  <Cancel />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default ImagesList;

