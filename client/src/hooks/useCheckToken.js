
// import { useEffect } from 'react';
// import { useValue } from '../context/ContextProvider'
// import { jwtDecode } from 'jwt-decode'

// const useCheckToken = () => {
 
    
//     const {state:{currentUser}, dispatch} = useValue();
//     useEffect(() => {
//         if(currentUser){

//             const decodedToken = jwtDecode(currentUser.token);
//             if(decodedToken.exp * 1000 < new Date().getTime()) 
//             dispatch({type:'UPDATE_USER', payload:null})


//         }
//     }, []);
  
// };

// export default useCheckToken

import { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';
import {jwtDecode} from 'jwt-decode'; // Fixed import: `jwtDecode` is a default export.

const useCheckToken = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    // Ensure this effect runs only when `currentUser` changes.
    if (currentUser?.token) {
      try {
        const decodedToken = jwtDecode(currentUser.token);

        // Check if the token is expired.
        if (decodedToken.exp * 1000 < Date.now()) {
          // Update the user state to null if the token is expired.
          dispatch({ type: 'UPDATE_USER', payload: null });
        }
      } catch (error) {
        console.error('Error decoding token:', error);

        // Handle invalid token case by clearing user state.
        dispatch({ type: 'UPDATE_USER', payload: null });
      }
    }
  }, [currentUser, dispatch]); // Added `currentUser` and `dispatch` to the dependency array.
};

export default useCheckToken;
