

// import { Box, Slider, Typography } from '@mui/material'
// import { useValue } from '../../context/ContextProvider'


// const marks = [

//     {value: 0, label: 'N0'},
//     {value: 460, label: 'N450M'},
//     // {value: 50, label: '50M'},
//     {value: 900, label: '900M'},
// ]

// const PriceSlider = () => {

//     const {state: {priceFilter}, dispatch} = useValue()
//   return (
   
//     <Box sx = {{ mt: 5 }}>

//         {/* currency state could be used here dynamically for multicurence */}
       
//             <Box sx = {{pl: 5}}>
//                  <Typography>
//                 Max Price: {`N` + priceFilter + `M`}

//                  </Typography>
//             </Box>
            
        
//         <Slider
//         min = {0}
//         max = {900}
//         defaultValue = {5}
//         valueLabelDisplay = 'auto'
//         marks = {marks}
//         value = {priceFilter}
//         onChange = { (_e, price) => dispatch( {type: 'FILTER_PRICE', payload: price} )}
//         />
//     </Box>
//   )
// }

// export default PriceSlider


// CHAT GPT/////////////////

import { Box, Slider, Typography } from '@mui/material';
import { useValue } from '../../context/ContextProvider';

const marks = [
  { value: 0, label: 'N0' },
  { value: 50, label: 'N50B' },
  { value: 100, label: 'N100B' },
];

const PriceSlider = () => {
  const { state: { priceFilter }, dispatch } = useValue();

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ pl: 5 }}>
        <Typography>
          Max Price: {`N` + priceFilter + `B` }
        </Typography>
      </Box>
      <Slider
        min={0}
        max={100}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={(_e, price) =>
          dispatch({ type: 'FILTER_PRICE', payload: price })
        }
      />
    </Box>
  );
};

export default PriceSlider;
