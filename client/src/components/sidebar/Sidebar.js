
import {Box, Drawer, IconButton, styled, Typography} from '@mui/material';
import {ChevronLeft} from '@mui/icons-material';
import PriceSlider from './PriceSlider';
import { useValue } from '../../context/ContextProvider';



const DrawerHeader = styled ('div') (({theme}) => ({

 display: 'flex',
 alignments: 'space-between',
 padding: theme.spacing (0,1),
 ...theme.mixins.toolbar,
 backgroundColor: 'rgba(173, 205, 251, 0.48)'
})
)

const Sidebar = ({isOpen, setIsOpen}) => {
    

    const {containerRef } = useValue()
  return (
    <Drawer
    variant = 'persistent'
    hideBackdrop = { true }
    open = {isOpen}

    PaperProps={{
        sx: {
        //   backgroundColor: '#f5f5f5', // Apply background color here
          backgroundColor: 'rgba(245, 245, 245, 0.79)', // Apply background color here

        },
      }}

    >
        <DrawerHeader sx = {{pt: 3,}}>
            <Typography  fontSize = '1.3rem'> Search or Filter properties </Typography>

            <IconButton onClick = {() => setIsOpen(false)} >
                <ChevronLeft  fontSize = 'large' />
            </IconButton>
        </DrawerHeader >

            <Box sx = {{ width: 240, p: 3 }}>

                <Box ref = {containerRef} > </Box>
             
                <PriceSlider/>
            </Box>

    </Drawer>
  )
}

export default Sidebar