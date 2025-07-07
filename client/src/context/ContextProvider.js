import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import reducer from "./reducer";

const initialState = {
  currentUser: null,
  loading: false,
  openLogin: false,
  alert: { open: false, severity: 'info', message: '' }, // Fixed 'severity' typo
  profile: {open: false, file: null, photoURL: ''},
  images: [],
  details: {title: '', description: '', price: 0 },
  location: { lng: 8.6753, lat: 9.082}, 
  rooms: [],
  users: [],
  // properties: [],
  priceFilter: 100,
  addressFilter: null,
  filteredRooms: [],
  room: null,

  // filteredProperties: [],

};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        dispatch({ type: 'UPDATE_USER', payload: currentUser });
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
