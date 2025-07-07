

// OVER ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL


// import ReactMapGL, { Marker } from "react-map-gl";
// import { Box } from "@mui/material";
// import { useValue } from "../../../context/ContextProvider";
// import "mapbox-gl/dist/mapbox-gl.css";

// const AddLocation = () => {
//   const {
//     state: {
//       location: { lng, lat },
//     },
//     dispatch,
//   } = useValue();

//   return (
//     <Box
//       sx={{
//         height: 400,
//         position: "relative",
//       }}
//     >
//       <ReactMapGL
//         mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
//         initialViewState={{
//           longitude: lng || 8.6753, // Default to Nigeria
//           latitude: lat || 9.082,
//           zoom: 8,
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         <Marker
//           latitude={lat || 9.082}
//           longitude={lng || 8.6753}
//           draggable
//           onDragEnd={(event) =>
//             dispatch({
//               type: "UPDATE_LOCATION",
//               payload: {
//                 lng: event.lngLat.lng,
//                 lat: event.lngLat.lat,
//               },
//             })
//           }
//         />
//       </ReactMapGL>
//     </Box>
//   );
// };

// export default AddLocation;

// LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { Box } from "@mui/material";
import { useValue } from "../../../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Geocoder from "./Geocoder";


const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();

  const mapRef = useRef();


  useEffect (() => {
    if(!lng && !lat) {
      fetch('https://ipapi.co/json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        mapRef.current.flyTo({
          center: [data.longitude, data.latitude],
        });

        dispatch ({
          type: 'UPDATE_LOCATION',
          payload: {lng: data.longitude, lat: data.latitude},
        });
      });
    }
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL

      ref = {mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          longitude: lng || 8.6753, // Default to Nigeria
          latitude: lat || 9.082,
          zoom: 8,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Marker */}
        <Marker
          latitude={lat || 9.082}
          longitude={lng || 8.6753}
          draggable
          onDragEnd={(event) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: {
                lng: event.lngLat.lng,
                lat: event.lngLat.lat,
              },
            })
          }
        />

         <Geocoder/>

        {/* Zoom Controls */}
        <NavigationControl
          position="top-right" // Place controls on the top-right of the map
        />
        <GeolocateControl
        position = 'top-left'
        trackUserLocation
        onGeoLocate = {(e) => dispatch ({type: 'UPDATE_LOCATION', payload: {lng: e.coords.longitude, lat: e.coords.lat}})}
        />
       
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
