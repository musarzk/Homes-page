

//         import  { Avatar, Card, Container, 
//         ImageList, ImageListItem, 
//         ImageListItemBar, 
//         Rating, Tooltip } from '@mui/material'
//         import {StarBorder} from '@mui/icons-material'
//         import { useValue} from '../../context/ContextProvider'


//         const Rooms = () => {

//         const {state: {filteredRooms}} = useValue()

        
//           console.log(filteredRooms); // Debug: Ensure filteredRooms is not empty
//         return (

//         <Container>
//         <ImageList 
//         gap = {10}
//         sx = {{
//         mb: 8,
//         pt: 13,
//         pb: 5,
//           gridTemplateColumns:
//           'repeat(auto-fill, minmax(280px, 1fr))!important',
//         }} 
//         >
//         {filteredRooms.map((room) => (
//         <Card key = {room._id}>

//         <ImageListItem sx = {{height: '100% !important'}} >

//         <ImageListItemBar 
//         sx = {{background: 
//         'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0,0) 100%) '
       
// ,
//         }}
//         title = {room.price === 0 ? 'Free Stay' : 'N' + room.price}
//         actionIcon = {
//         <Tooltip title = {room.uName}
//         sx = {{mr: '5px'}}
//         >
//           <Avatar src = {room.uPhoto} />
//         </Tooltip>
//         }
//         position = 'top'
//         />

//         <img
//         src = {room.images[0]}
//         alt = {room.title}
//         loading = 'lazy'
//         style = {{cursor: "pointer"}}

//         />

//         <ImageListItemBar
//         title = {room.title}
//         actionIcon = {
//         <Rating
//         sx = {{color: 'rgba(255,255,255, 0.8)', mr: '5px'}}
        

//         name = 'Rating'
//         defaultValue = {3.5}
//         precision = {0.5}
//         emptyIcon = {
//           <StarBorder sx = {{color: 'rgba(255,255,255, 0.8)'}}/>
//         }
//         />

//         }
//         />

//         </ImageListItem>

//         </Card>
//         ))}

//         </ImageList>

//         </Container>
//         );
//         };
//         export default Rooms;


// WITH USING DATABASE DATA 1 ///////////////////

// import {
//   Avatar,
//   Card,
//   Container,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   Rating,
//   Tooltip,
//   CircularProgress,
//   Typography,
// } from '@mui/material';
// import { StarBorder } from '@mui/icons-material';
// import { useValue } from '../../context/ContextProvider';
// import { useEffect } from 'react';
// import fetchData from '../../actions/utils/fetchData'; // Assuming fetchData is in a utils folder

// const Rooms = () => {
//   const {
//     state: { rooms, filteredRooms },
//     dispatch,
//   } = useValue();

//   const url = process.env.REACT_APP_SERVER_URL + '/rooms';

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const result = await fetchData({ url: url + '/getRooms', body: rooms }, dispatch);
//         if (result) {
//           dispatch({ type: 'SET_ROOMS', payload: result });
//         }
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       }
//     };

//     fetchRooms();
//   }, [dispatch, url, rooms]);

//   const displayedRooms = filteredRooms.length ? filteredRooms : rooms;

//   if (!rooms) {
//     return (
//       <Container sx={{ textAlign: 'center', mt: 10 }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Loading rooms...
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <ImageList
//         gap={10}
//         sx={{
//           mb: 8,
//           pt: 13,
//           pb: 5,
//           gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
//         }}
//       >
//         {displayedRooms.map((room) => (
//           <Card key={room._id}>
//             <ImageListItem sx={{ height: '100% !important' }}>
//               <ImageListItemBar
//                 sx={{
//                   background:
//                     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//                 }}
//                 title={room.price === 0 ? 'Free Stay' : 'N' + room.price}
//                 actionIcon={
//                   <Tooltip title={room.uName} sx={{ mr: '5px' }}>
//                     <Avatar src={room.uPhoto} />
//                   </Tooltip>
//                 }
//                 position="top"
//               />
//               <img
//                 src={room.images[0]}
//                 alt={room.title}
//                 loading="lazy"
//                 style={{ cursor: 'pointer' }}
//               />
//               <ImageListItemBar
//                 title={room.title}
//                 actionIcon={
//                   <Rating
//                     sx={{ color: 'rgba(255,255,255,0.8)', mr: '5px' }}
//                     name="Rating"
//                     defaultValue={3.5}
//                     precision={0.5}
//                     emptyIcon={<StarBorder sx={{ color: 'rgba(255,255,255,0.8)' }} />}
//                   />
//                 }
//               />
//             </ImageListItem>
//           </Card>
//         ))}
//       </ImageList>
//     </Container>
//   );
// };

// export default Rooms;

//  WITH FECTH DATA 2//////////////////////////////////


import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { StarBorder } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import { useEffect } from "react";
import { fetchRooms } from "../../actions/utils/fetchRooms"; // Importing the fetchRooms function

const Rooms = () => {
  const {
    state: { rooms, filteredRooms },
    dispatch,
  } = useValue();

  // Fetch rooms when the component mounts
  useEffect(() => {
    fetchRooms(dispatch);
  }, [dispatch]);

  const displayedRooms = filteredRooms.length ? filteredRooms : rooms;

  if (!rooms) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading rooms...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <ImageList
        gap={10}
        sx={{
          mb: 8,
          pt: 13,
          pb: 5,
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {displayedRooms.map((room) => (
          <Card key={room._id}>
            <ImageListItem sx={{ height: "100% !important" }}>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                
                title={room.title}
                actionIcon={
                  <Tooltip title={room.uName} sx={{ mr: "5px" }}>
                    <Avatar src={room.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={room.images[0]}
                alt={room.title}
                loading="lazy"
                style={{ cursor: "pointer" }}

                onClick={() => dispatch({type: 'UPDATE_ROOM', payload: room})}
              />
              <ImageListItemBar
                title={room.price === 0 ? "Free Stay" : "N" + room.price}
                actionIcon={
                  <Rating
                    sx={{ color: "rgba(254, 213, 10, 0.97)", mr: "5px" }}
                    name="Rating"
                    defaultValue={4}
                    precision={0.5}
                    emptyIcon={<StarBorder sx={{ color: "rgba(255,255,255,0.8)" }} />}
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Rooms;




        // PROPERTY /////////////////////////////////////


        
//         import {
//   Avatar,
//   Card,
//   Container,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   Rating,
//   Tooltip,
// } from '@mui/material';
// import { StarBorder } from '@mui/icons-material';
// import { useValue } from '../../context/ContextProvider';

// const Properties = () => {
//   const { state: { filteredProperties } } = useValue();

//   console.log(filteredProperties); // Debug: Ensure filteredProperties is not empty
//   return (
//     <Container>
//       <ImageList
//         gap={10}
//         sx={{
//           mb: 8,
//           pt: 13,
//           pb: 5,
//           gridTemplateColumns:
//             'repeat(auto-fill, minmax(280px, 1fr))!important',
//         }}
//       >
//         {filteredProperties.map((property) => (
//           <Card key={property._id}>
//             <ImageListItem sx={{ height: '100% !important' }}>
//               <ImageListItemBar
//                 sx={{
//                   background:
//                     'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//                 }}
//                 title={
//                   property.price === 0
//                     ? 'Free Stay'
//                     : 'N' + property.price
//                 }
//                 actionIcon={
//                   <Tooltip title={property.uName} sx={{ mr: '5px' }}>
//                     <Avatar src={property.uPhoto} />
//                   </Tooltip>
//                 }
//                 position="top"
//               />
//               <img
//                 src={property.images[0]}
//                 alt={property.title}
//                 loading="lazy"
//                 style={{ cursor: 'pointer' }}
//               />
//               <ImageListItemBar
//                 title={property.title}
//                 actionIcon={
//                   <Rating
//                     sx={{ color: 'rgba(255,255,255,0.8)', mr: '5px' }}
//                     name="Rating"
//                     defaultValue={3.5}
//                     precision={0.5}
//                     emptyIcon={
//                       <StarBorder
//                         sx={{ color: 'rgba(255,255,255,0.8)' }}
//                       />
//                     }
//                   />
//                 }
//               />
//             </ImageListItem>
//           </Card>
//         ))}
//       </ImageList>
//     </Container>
//   );
// };

// export default Properties;

// WITH FETCH PROPERTIES//////////////////////////////////

// import {
//   Avatar,
//   Card,
//   Container,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   Rating,
//   Tooltip,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import { StarBorder } from "@mui/icons-material";
// import { useValue } from "../../context/ContextProvider";
// import { useEffect } from "react";
// import { fetchProperties } from "../../actions/utils/fetchProperties"; // Importing the fetchProperties function

// const Properties = () => {
//   const {
//     state: { properties, filteredProperties },
//     dispatch,
//   } = useValue();

//   // Fetch properties when the component mounts
//   useEffect(() => {
//     fetchProperties(dispatch);
//   }, [dispatch]);

//   const displayedProperties = filteredProperties.length ? filteredProperties : properties;

//   if (!properties) {
//     return (
//       <Container sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Loading properties...
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <ImageList
//         gap={10}
//         sx={{
//           mb: 8,
//           pt: 13,
//           pb: 5,
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))!important",
//         }}
//       >
//         {displayedProperties.map((property) => (
//           <Card key={property._id}>
//             <ImageListItem sx={{ height: "100% !important" }}>
//               <ImageListItemBar
//                 sx={{
//                   background:
//                     "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
//                 }}
//                 title={property.price === 0 ? "Free Stay" : "N" + property.price}
//                 actionIcon={
//                   <Tooltip title={property.ownerName} sx={{ mr: "5px" }}>
//                     <Avatar src={property.ownerPhoto} />
//                   </Tooltip>
//                 }
//                 position="top"
//               />
//               <img
//                 src={property.images[0]}
//                 alt={property.title}
//                 loading="lazy"
//                 style={{ cursor: "pointer" }}
//               />
//               <ImageListItemBar
//                 title={property.title}
//                 actionIcon={
//                   <Rating
//                     sx={{ color: "rgba(255,255,255,0.8)", mr: "5px" }}
//                     name="Rating"
//                     defaultValue={3.5}
//                     precision={0.5}
//                     emptyIcon={<StarBorder sx={{ color: "rgba(255,255,255,0.8)" }} />}
//                   />
//                 }
//               />
//             </ImageListItem>
//           </Card>
//         ))}
//       </ImageList>
//     </Container>
//   );
// };

// export default Properties;





