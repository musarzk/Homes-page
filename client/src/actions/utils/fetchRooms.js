


import fetchData from "./fetchData"; // Assuming fetchData is your reusable utility function

export const fetchRooms = async (dispatch) => {
  dispatch({ type: "START_LOADING" });

  const url = process.env.REACT_APP_SERVER_URL + '/room'

  try {
    const result = await fetchData({ url: url +'/getRooms'}, dispatch);
    if (result) {
      dispatch({ type: "SET_ROOMS", payload: result });
    }
  } catch (error) {
    console.error("Failed to fetch rooms:", error.message);
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message || "Failed to fetch rooms. Please try again later.",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};




// PROPERTIES//////////////////////////////

// import fetchData from "./fetchData"; // Assuming fetchData is your reusable utility function
// const url = process.env.REACT_APP_SERVER_URL + "/properties";

// export const fetchProperties = async (dispatch) => {
//   dispatch({ type: "START_LOADING" });

//   try {
//     const result = await fetchData({ url: url + "/getProperties" }, dispatch);
//     if (result) {
//       dispatch({ type: "SET_PROPERTIES", payload: result });
//     }
//   } catch (error) {
//     dispatch({
//       type: "UPDATE_ALERT",
//       payload: {
//         open: true,
//         severity: "error",
//         message: "Failed to fetch properties. Please try again later.",
//       },
//     });
//   }

//   dispatch({ type: "END_LOADING" });
// };
