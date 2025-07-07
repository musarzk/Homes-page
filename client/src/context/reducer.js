
        // import { Description } from "@mui/icons-material"
        // const reducer = (state, action) => {
        // switch (action.type) {

import Users from "../pages/dashboard/users/Users";

        // case 'OPEN_LOGIN': 
        // return {...state, openLogin:true}
        // case 'CLOSE_LOGIN': 
        // return {...state, openLogin:false}

        // case 'START_LOADING': 
        // return {...state, loading:true}
        // case 'END_LOADING': 
        // return {...state, loading:false}


        // case 'UPDATE_ALERT': 
        // return {...state, alert: action.payload}

        // case 'UPDATE_PROFILE': 
        // return {...state, profile:action.payload}

        // case 'UPDATE_USER': 
        // localStorage.setItem('currentUser', JSON.stringify(action.payload));
        // return {...state, currentUser:action.payload};

        // case 'UPDATE_IMAGES':
        // return {...state, images: [...state.images, action.payload]};

        // case 'DELETE_IMAGE':
        // return {...state, images: state.images.filter((image) => image !== action.payload)};

        // case 'UPDATE_DETAILS':
        // return {...state, details: {...state.details, ...action.payload}};
        // case 'UPDATE_LOCATION':
        // return {
        // ...state,
        // location: action.payload};

        // case 'RESET_ROOM':
        // return{
        // ...state, 
        // images: [],
        // details: {title: '', description: "", price: 0 },
        // location: {lng: 0, lat: 0 }, 
        // };



        // // ROOM
        // case 'UPDATE_ROOMS':
        // return {...state, rooms: action.payload, addressFilter: null, priceFilter: 100, filterdRooms: action.payload};

        // // ROOM
        // case 'FILTER_PRICE':
        // return {...state, priceFilter: action.payload, filteredRooms: applyFilter(
        // state.rooms, state.addressFilter, action.payload
        // )};


        // // ROOM

        // case 'FILTER_ADDRESS':
        //       return {...state, addressFilter: action.payload, filteredRooms: applyFilter (
        //       state.rooms, action.payload, state.price,
        //     ) };

        //     // FOR FETCH ROOM CODE FROM CHAT //////
        // case 'SET_ROOMS':
        // return { ...state, rooms: action.payload };





        // case 'CLEAR_ADDRESS':
        // return {...state, addressFilter: null, priceFilter: 100,  filteredRooms: state.rooms };




        // default:
        // throw new Error('No matched action!')
        // }
        // }

        // export default reducer;


        // const applyFilter = (rooms, address, price) => {

        // let filteredRooms = rooms
        // if (address){
        // const {lng, lat} = address
        // filteredRooms = filteredRooms.filter( room => {
        // const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng
        // const latDifference = lat > room.lng ? lat - room.lat : room.lat - lat
        // return lngDifference <= 1 && latDifference <= 1
        // });
        // }
        // if (price <  100) {

        // filteredRooms = filteredRooms.filter( room => room.price <= price);
        // }

        // return filteredRooms

        // }

// PROPERTIES/////////////////////////////

// const applyFilter = (properties, address, price) => {
//   let filteredProperties = properties;
  
//   if (address) {
//     const { lng, lat } = address;
//     filteredProperties = filteredProperties.filter(property => {
//       const lngDifference = lng > property.lng ? lng - property.lng : property.lng - lng;
//       const latDifference = lat > property.lat ? lat - property.lat : property.lat - lat;
//       return lngDifference <= 1 && latDifference <= 1;
//     });
//   }
  
//   if (price < 100) {
//     filteredProperties = filteredProperties.filter(property => property.price <= price);
//   }
  
//   return filteredProperties;
// };

// REDUCER CODE ENHANSED BY CHAT//////////////////

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, action.payload] };

    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };

    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };

    case 'RESET_ROOM':
      return {
        ...state,
        images: [],
        details: { title: '', description: '', price: 0 },
        location: { lng: 0, lat: 0 },
      };

    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.payload,
        filteredRooms: action.payload, // Default to all rooms
      };

    case 'UPDATE_ROOMS':
      return {
        ...state,
        rooms: action.payload,
        addressFilter: null,
        priceFilter: 100,
        filteredRooms: action.payload,
      };

    case 'FILTER_PRICE':
      return {
        ...state,
        priceFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          state.addressFilter,
          action.payload
        ),
      };

    case 'FILTER_ADDRESS':
      return {
        ...state,
        addressFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          action.payload,
          state.priceFilter
        ),
      };

    case 'CLEAR_ADDRESS':
      return {
        ...state,
        addressFilter: null,
        priceFilter: 100,
        filteredRooms: state.rooms,
      };

      case 'UPDATE_ROOM':
        return {
          ...state,
          room: action.payload
        };

      case 'UPDATE_USERS':
        return {
          ...state,
          users: action.payload
        };


    default:
      throw new Error('No matched action!');
  }
};

export default reducer;

const applyFilter = (rooms, address, price) => {
  let filteredRooms = rooms;
  if (address) {
    const { lng, lat } = address;
    filteredRooms = filteredRooms.filter((room) => {
      const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng;
      const latDifference = lat > room.lat ? lat - room.lat : room.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }
  if (price < 100) {
    filteredRooms = filteredRooms.filter((room) => room.price <= price);
  }
  return filteredRooms;
};

// REDUCER CODE FOR PROPERTY ///////////////////////////////////

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'OPEN_LOGIN':
//       return { ...state, openLogin: true };
//     case 'CLOSE_LOGIN':
//       return { ...state, openLogin: false };

//     case 'START_LOADING':
//       return { ...state, loading: true };
//     case 'END_LOADING':
//       return { ...state, loading: false };

//     case 'UPDATE_ALERT':
//       return { ...state, alert: action.payload };

//     case 'UPDATE_PROFILE':
//       return { ...state, profile: action.payload };

//     case 'UPDATE_USER':
//       localStorage.setItem('currentUser', JSON.stringify(action.payload));
//       return { ...state, currentUser: action.payload };

//     case 'UPDATE_IMAGES':
//       return { ...state, images: [...state.images, action.payload] };

//     case 'DELETE_IMAGE':
//       return {
//         ...state,
//         images: state.images.filter((image) => image !== action.payload),
//       };

//     case 'UPDATE_DETAILS':
//       return { ...state, details: { ...state.details, ...action.payload } };
//     case 'UPDATE_LOCATION':
//       return { ...state, location: action.payload };

//     case 'RESET_PROPERTY':
//       return {
//         ...state,
//         images: [],
//         details: { title: '', description: '', price: 0 },
//         location: { lng: 0, lat: 0 },
//       };

//     case 'SET_PROPERTIES':
//       return {
//         ...state,
//         properties: action.payload,
//         filteredProperties: action.payload, // Default to all properties
//       };

//     case 'UPDATE_PROPERTIES':
//       return {
//         ...state,
//         properties: action.payload,
//         addressFilter: null,
//         priceFilter: 100,
//         filteredProperties: action.payload,
//       };

//     case 'FILTER_PRICE':
//       return {
//         ...state,
//         priceFilter: action.payload,
//         filteredProperties: applyPropertyFilter(
//           state.properties,
//           state.addressFilter,
//           action.payload
//         ),
//       };

//     case 'FILTER_ADDRESS':
//       return {
//         ...state,
//         addressFilter: action.payload,
//         filteredProperties: applyPropertyFilter(
//           state.properties,
//           action.payload,
//           state.priceFilter
//         ),
//       };

//     case 'CLEAR_ADDRESS':
//       return {
//         ...state,
//         addressFilter: null,
//         priceFilter: 100,
//         filteredProperties: state.properties,
//       };

//     default:
//       throw new Error('No matched action!');
//   }
// };

// export default reducer;

// const applyPropertyFilter = (properties, address, price) => {
//   let filteredProperties = properties;
//   if (address) {
//     const { lng, lat } = address;
//     filteredProperties = filteredProperties.filter((property) => {
//       const lngDifference =
//         lng > property.lng ? lng - property.lng : property.lng - lng;
//       const latDifference =
//         lat > property.lat ? lat - property.lat : property.lat - lat;
//       return lngDifference <= 1 && latDifference <= 1;
//     });
//   }
//   if (price < 100) {
//     filteredProperties = filteredProperties.filter(
//       (property) => property.price <= price
//     );
//   }
//   return filteredProperties;
// };
