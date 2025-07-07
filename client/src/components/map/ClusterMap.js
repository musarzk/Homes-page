

// import { useEffect, useState } from "react";
// import { useValue } from "../../context/ContextProvider";
// import { getRooms } from "../../actions/room";
// import Supercluster from "supercluster";
// import './cluster.css';

// import ReactMapGL, { Marker } from 'react-map-gl';
// import { Avatar, Box, Paper, Tooltip } from "@mui/material";
// import GeocoderInput from "../sidebar/GeocoderInput";

// const supercluster = new Supercluster ({
//   radius: 75,
//   maxZoom: 20
// })



// const ClusterMap = () => {

//   const {
//     // state: { filtereproperties },
//     state: { filteredRooms },
//     dispatch,
//     mapRef
//   } = useValue();

//   const [points, setPoints] = useState( [] );
//   const [ clusters, setClusters ] = useState( [] );
//   const [bounds, setBounds] = useState( [-180, -85, 180, 85] );
//   const [ zoom, setZoom] = useState(0);

//   useEffect( () => {
//     getRooms (dispatch);
//   }, []);

//   useEffect ( () => {
//    const points = filteredRooms.map( room => ({
//     type: 'Feature',
//     properties:{
//       cluster: false,
//       roomId: room._id,
//       price: room.price,
//       title: room.title,
//       description: room.description,
//       lng: room.lng,
//       lat: room.lat,
//       images: room.images,
//       uPhoto: room.uPhoto,
//       uName: room.uName
//     },
//     geometry: {
//       type: 'Point',
//       coordinates: [ parseFloat (room.lng), parseFloat(room.lat) ]
//     }
//    }))
//    setPoints(points)
//   }, [filteredRooms]);
  
//   useEffect ( () => {
//     supercluster.load (points)
//     setClusters ( supercluster.getClusters (bounds, zoom))
//   }, [points, zoom, bounds])


//   useEffect ( () => {
//     if (mapRef.current) {
//       setBounds(mapRef.current.getMap().getBounds().toArray().flat())
//     }
//   }, [mapRef ?.current])
//   return (

//     <ReactMapGL
//     // initialViewState={{latitude: 51.5072, longitude: 0.1276}}
//     // initialViewState={{latitude: 8.6753, longitude: 9.082}}
//     initialViewState={{ latitude: 9.082, longitude: 8.6753, zoom: 6 }} // Focused on Nigeria
    
//     mapboxAccessToken = {process.env.REACT_APP_MAP_TOKEN}
//     mapStyle = 'mapbox://styles/mapbox/streets-v11'
//     ref = {mapRef}
//     onZoomEnd = {(e) => setZoom (Math.round(e.viewState.zoom))}
//       >
//         {clusters.map(cluster => {
//           const {cluster: isCluster, point_count} = cluster.properties
//           const [longitude, latitude] = cluster.geometry.coordinates

//           if (isCluster) {

//             return (
//               <Marker
//               key ={ `cluster-${cluster.id}`}
//               longitude={longitude}
//               latitude={latitude}
//               >

//                 <div
//                 className = 'cluster-marker'
//                 style = {{
//                   width: `${10+ (point_count/points.length)*20}px`,
//                   height: `${10+ (point_count/points.length)*20}px`,
//                 }}
//                 onClick = { () => {
//                   const zoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)

//                   mapRef.current.flyTo({
//                     center: [longitude, latitude],
//                     zoom,
//                     speed: 1
//                   })
//                 }}
//                 >
//                   {point_count}
//                 </div>

//               </Marker>
//             )
//           }

//           return (
//             <Marker
//             key={ `room-${cluster.properties.roomId}`}
//               longitude={longitude}
//               latitude={latitude}
//             >

//               <Tooltip
//               // title = {cluster.properties.uName}
//               title={
//                   <>
//                     <div><strong>Location:</strong> {cluster.properties.location}</div>
//                     <div><strong>Price:</strong> N{cluster.properties.price}</div>
//                     <div><strong>Description:</strong> {cluster.properties.description}</div>
//                   </>
//                 }
//               >

//                 <Avatar
//                 src = {cluster.properties.uPhoto}
//                 component = {Paper}
//                 elevation = {2}
//                 />
//               </Tooltip>

//             </Marker>
//           )
//         })}

  
//        <GeocoderInput />

      
//     </ReactMapGL>
//   )
  
// };

// export default ClusterMap



import { useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { getRooms } from "../../actions/room";
import PopupCard from "./PopupCard";
import Supercluster from "supercluster";
import './cluster.css';

import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import { Avatar, Box, Paper, Tooltip } from "@mui/material";
import GeocoderInput from "../sidebar/GeocoderInput";

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});


const ClusterMap = () => {
  const {
    state: { filteredRooms },
    dispatch,
    mapRef,
  } = useValue();

  const [allRooms, setAllRooms] = useState([]); // Hold all rooms if no filter is applied
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  const [popupInfo, setPopupInfo] = useState(null)

  // Fetch rooms once and store in allRooms
  useEffect(() => {
    getRooms(dispatch)
      .then((rooms) => setAllRooms(rooms || []))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [dispatch]);

  useEffect(() => {
    const roomsToUse = filteredRooms.length > 0 ? filteredRooms : allRooms;

    const points = roomsToUse.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
  }, [filteredRooms, allRooms]);

  useEffect(() => {
    if (points.length) {
      supercluster.load(points);
      setClusters(supercluster.getClusters(bounds, zoom));
    }
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <ReactMapGL
      initialViewState={{ latitude: 9.082, longitude: 8.6753, zoom: 6 }} // Focused on Nigeria
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {(clusters || []).map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties || {};
        const [longitude, latitude] = cluster.geometry.coordinates || [0, 0];

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );

                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`room-${cluster.properties.roomId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip
              title={
                <>
                  <div>
                    <strong>Title:</strong> {cluster.properties.title}
                  </div>
                  <div>
                    <strong>Price:</strong> N{cluster.properties.price}
                  </div>
                  <div>
                    <strong>Description:</strong> {cluster.properties.description}
                  </div>
                </>
              }
            >
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick = { () => setPopupInfo (cluster?.properties)}
              />
            </Tooltip>
          </Marker>
        );
      })}
      <GeocoderInput />

      
        { popupInfo && (

          <Popup
      longitude={popupInfo.lng}
      latitude={popupInfo.lat}
      maxWidth="auto"
      closeOnClick={false}
      focusAfterOpen={false}
      onClose={ () => setPopupInfo(null)}
      >

         <PopupCard  {...{popupInfo} } />
        </Popup>
        

        ) }

       
        
      
    </ReactMapGL>
  );
};

export default ClusterMap;


