// import { Paper } from '@mui/material';
// import React, { useCallback, useState } from 'react';
// import {useDropzone} from 'react-dropzone'
// import ProgressList from './progressList/ProgressList';
// import ImagesList from '../../ImagesList';

// const AddImages = () => {
//     const [files, setFiles] = useState ([])
//     const onDrop = useCallback((acceptedFiles) => {
//     setFiles(acceptedFiles)
//     console.log(acceptedFiles)
//     }, [])
//     const {getRootProps, getInputProps, isDragActive} = useDropzone({
//         onDrop,
//         accept: {'images/*':[]}
//     })
//   return (
//     <>
    
//     <Paper
//     sx={{
//         cursor: 'pointer',
//         background: '#f4f4f4',
//         color: '#bdbdbd',
//         border: 'dash #ccc',
//         '&: hover': {border: ' 1px solid #cccc'}
//     }}
//     >
//         <div style={{padding: '16px'}} {...getRootProps()}>

//             <input {...getInputProps()} />
//             {isDragActive?(
//             <p style={{color: 'green'}}> Drop Image files here... </p>
//             ):(

//             <p style={{color: 'grey'}}> Drag and drop Image files here... </p>

//             )}

//             <em> (Only image with *.jpg, *.png, *.jpeg estention will be accepted)</em>
            
//         </div>

//     </Paper>
//     <ProgressList {...{files}}/>
//     <ImagesList/>
//     </>




//   )
// }

// export default AddImages

//CHAT GPT 1//////////////////////////////

import { Paper } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProgressList from './progressList/ProgressList';
import ImagesList from '../../ImagesList';

const AddImages = () => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }, // Corrected MIME type
    });

    return (
        <>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#f4f4f4',
                    color: '#bdbdbd',
                    border:  'solid #cccc',
                    '&:hover': { border: 'dashed #ccc'},
                }}
            >
                <div style={{ padding: '16px' }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p style={{ color: 'green' }}>Drop image files here...</p>
                    ) : (
                        <p style={{ color: 'grey' }}>Drag and drop image files here...</p>
                    )}
                    <em>(Only images with *.jpg, *.png, *.jpeg extensions will be accepted)</em>
                </div>
            </Paper>
            <ProgressList {...{ files }} />
            <ImagesList />
        </>
    );
};

export default AddImages;

//  CHAT 2//////////////////////////


