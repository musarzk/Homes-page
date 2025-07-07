// import React from 'react'

// import {Box, Card, ImageListItem, ImageListItemBar } from '@mui/material'
// import {useValue} from '../../context/ContextProvider';


// import {Swiper, SwiperSlide} from 'swiper/react';
// import { Pagination, Autoplay, Zoom } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/zoom';
// import 'swiper/css/pagination';




// const PopupCard = ({popupInfo}) => {

 
//     const {title, description, price, images} = popupInfo
//     const {dispatch} = useValue();
//   return (
    
//     <Card  sx = {{maxWidth: 400}} >
//         <ImageListItem sx ={{display: 'block'}} >

//             <ImageListItemBar
//                 sx ={{
//                 background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0,.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
//                 zIndex: 2,
//                 border: 3,
               
//             }} 

//                 title = {price === 0? 'free Stay' :'N'+price}
//                 position = 'top'

//             />
//             <ImageListItem
            
//             title = {title}
//             subtitle = {description ?.substr(0,3)+'...' }
//             sx ={{zIndex: 2}}
//             />

//             <Swiper
//             module = {[Pagination, Autoplay, Zoom]}
//             autoplay
//             lazy = {true}
//             zoom = {true}
//             pagination = {{clickable: true}}
//             style = {{
//                 '--swiper-pagination-color':' rgba(252, 248, 252, 0.9) ',
//                 '--swiper-pagination-bullet-inactive-color': '#fff',
//                 '--swiper-pagination-bullet-inactive-opacity': 0.5,
//             }}
//             >
//                 {images?.map(url => (
//             <SwiperSlide key={url}>
//               <Box
//                 component="img"
//                 src={url}
//                 alt="room"
//                 sx={{
//                   height: 255,
//                   display: 'block',
//                   overflow: 'hidden',
//                   width: '100%',
//                   cursor: 'pointer',
//                   objectFit: 'cover',
//                 }}
//                 onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: popupInfo })}
//               />
//             </SwiperSlide>
//           ))}

//             </Swiper>
                
//         </ImageListItem>

//     </Card>
//   )
// }

// export default PopupCard





    
import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, Zoom } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

const PopupCard = ({popupInfo}) => {
  const { title, description = '', price, images = [] } = popupInfo; // Default to empty string/array if undefined
  const { dispatch } = useValue();

  return (
    <Card sx={{ maxWidth: 400 }}>
  <ImageListItem sx={{ display: 'block' }}>
    <ImageListItemBar
      sx={{
        background: 'linear-gradient(to bottom, rgba(48, 41, 41, 0.1) 0%, rgba(39, 41, 52, 0.3) 70%, rgba(0, 0, 0, 0) 100%)', // Reduced opacity
        zIndex: 2,
      }}
      title={price === 0 ? 'Free Stay' : 'N' + price}
    />

    <ImageListItemBar
      title={title + '...'}
      position="top"
      sx={{
        zIndex: 2,
        background: 'linear-gradient(to top, rgba(95, 88, 83, 0.21) 0%, rgba(56, 54, 55, 0.29) 70%, rgba(0, 0, 0, 0) 100%)', // Reduced opacity
      }}
    />

    <Swiper
      modules={[Pagination, Navigation, Autoplay, Zoom]}
      autoplay
      lazy={true}
      zoom={true}
      pagination={{ clickable: true }}
      style={{
        '--swiper-pagination-color': ' rgb(254, 251, 255) ',
        '--swiper-pagination-bullet-interactive-opacity': 0.5,
      }}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <Box
            component="img"
            src={url}
            alt="room"
            sx={{
              height: 400,
              display: 'block',
              overflow: 'hidden',
              width: '100%',
              cursor: 'pointer',
              objectFit: 'cover',
            }}
            onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: popupInfo })}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </ImageListItem>
</Card>

  );
};

export default PopupCard;


//  PROMPT//////////////////////////////

// import React from 'react';
// import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
// import { useValue } from '../../context/ContextProvider';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation, Autoplay, Zoom } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/zoom';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/navigation';

// const PopupCard = (popupInfo) => {
//   console.log('Popup Info:', popupInfo); // Debug log
//   const { title = 'No Title', description = 'No Description', price = 0, images = [] } = popupInfo;
//   const { dispatch } = useValue();

//   return (
//     <Card sx={{ maxWidth: 400 }}>
//       <ImageListItem
//         sx={{
//           background:
//             'linear-gradient(to bottom, rgba(0,0,0,0,.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
//         }}
//         title={price === 0 ? 'Free Stay' : 'N' + price}
//         position="top"
//       >
//         <ImageListItemBar
//           title={title}
//           subtitle={description ? description.substr(0, 3) + '...' : ''}
//           sx={{ zIndex: 2 }}
//         />

//         {images.length > 0 ? (
//           <Swiper
//             modules={[Pagination, Navigation, Autoplay, Zoom]}
//             autoplay
//             lazy={true}
//             zoom={true}
//             pagination={{ clickable: true }}
//             style={{
//               '--swiper-pagination-color': ' rgba(255, 233,255, 0.8) ',
//               '--swiper-pagination-bullet-interactive-opacity': 0.5,
//             }}
//           >
//             {images.map((url, index) => (
//               <SwiperSlide key={index}>
//                 <Box
//                   component="img"
//                   src={url}
//                   alt="room"
//                   sx={{
//                     height: 255,
//                     display: 'block',
//                     overflow: 'hidden',
//                     width: '100%',
//                     cursor: 'pointer',
//                     objectFit: 'cover',
//                   }}
//                   onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: popupInfo })}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <Box
//             sx={{
//               height: 255,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#ccc',
//               fontStyle: 'italic',
//             }}
//           >
//             No Images Available
//           </Box>
//         )}
//       </ImageListItem>
//     </Card>
//   );
// };

// export default PopupCard;



//  LAST PROMPT//////////////////////////////


// import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
// import { useValue } from '../../context/ContextProvider';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation, Autoplay, Zoom } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/zoom';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// const PopupCard = ({ title = 'No Title', description = 'No Description', price = 0, images = [] }) => {
//   const { dispatch } = useValue();

//   console.log('Popup Info:', { title, description, price, images }); // Debug log

//   return (
//     <Card sx={{ maxWidth: 400, margin: 'auto' }}>
//       <ImageListItem
//         sx={{
//           background:
//             'linear-gradient(to bottom, rgba(0,0,0,0,.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
//         }}
//         title={price === 0 ? 'Free Stay' : 'N' + price}
//       >
//         <ImageListItemBar
//           title={title}
//           subtitle={description ? description.substr(0, 50) + '...' : ''}
//           sx={{ zIndex: 2 }}
//         />

//         {images.length > 0 ? (
//           <Swiper
//             modules={[Pagination, Navigation, Autoplay, Zoom]}
//             autoplay
//             lazy
//             zoom
//             pagination={{ clickable: true }}
//             style={{
//               '--swiper-pagination-color': ' rgba(255, 233, 255, 0.8) ',
//               '--swiper-pagination-bullet-interactive-opacity': 0.5,
//             }}
//           >
//             {images.map((url, index) => (
//               <SwiperSlide key={index}>
//                 <Box
//                   component="img"
//                   src={url}
//                   alt="room"
//                   sx={{
//                     height: 255,
//                     display: 'block',
//                     overflow: 'hidden',
//                     width: '100%',
//                     cursor: 'pointer',
//                     objectFit: 'cover',
//                   }}
//                   onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: { title, description, price, images } })}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <Box
//             sx={{
//               height: 255,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#ccc',
//               fontStyle: 'italic',
//             }}
//           >
//             No Images Available
//           </Box>
//         )}
//       </ImageListItem>
//     </Card>
//   );
// };

// export default PopupCard;


