import {Close, StarBorder} from '@mui/icons-material';
import {useValue} from '../../context/ContextProvider'
import { Dialog, AppBar, IconButton, Slide, Toolbar, 
        Typography, Container, Tooltip, Avatar, 
        Stack, Box, Rating } from '@mui/material';
import {forwardRef, useEffect, useState} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import './swiper.css'


const Transition = forwardRef ( (props, ref) => {
    return <Slide direction='up' {...props} ref={ref}/>
})
const Room = () => {

    const {state: {room}, dispatch} = useValue();

    const [place, setPlace] = useState(null)

    
        useEffect(() => {
        if (room) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.lng},${room.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
        const areaName = data.features[1]?.text || ''; // Extract the area name
        const fullAddress = data.features[1]?.place_name || ''; // Extract the full address
        setPlace({ areaName, fullAddress });
        });
        }
        }, [room]);


    const handleClose = ( ) => {
        dispatch({type: 'UPDATE_ROOM', payload: null})
    }

    return (
    <Dialog
    fullScreen
    open = {Boolean(room)}
    onClose = {handleClose}
    TransitionComponent = {Transition}
    >

 <AppBar position = 'relative'>
    <Toolbar>
    <Typography
    variant = 'h6'
    component= 'h3'
    sx = {{ml: 2, flex: 1}}
    >

    {room?.title}
    </Typography>

    <IconButton color = 'inherit' onClick = {handleClose} > 
        <Close/>
    </IconButton>
    </Toolbar>

 </AppBar>
 
 
 <Container sx= {{pt: 5}} >

    

    
    <Swiper 
    modules={[Navigation, Autoplay, EffectCoverflow, Zoom]} 
    centeredSlides = {true}
    slidesPerView={2}
    grabCursor = {true}
    navigation = {true}
    autoplay
    lazy = {true}
    zoom = {true}
    effect='coverflow'
    coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        sliderShadows: true,
    }}
    >
        {room?.images.map((url) =>(
        
        <SwiperSlide key={url}>
            <div className='swiper-zoom-container'>
                <img src = {url}  alt = 'room' />

            </div >

        </SwiperSlide>
        ))}
        <Tooltip 
        title ={'Listed by:' + room?.uName || '' } 
        sx = {{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            zIndex: 2,
        }} >
            <Avatar src = {room?.uPhoto} />

        </Tooltip>

    </Swiper> 

    <Stack
    sx= {{p: 3}}
    spacing= {2} 
    >
        <Stack
        direction= 'row'
        sx= {{
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        }}>
            <Box>
                <Typography variant = 'h6' component = 'span' >
                    {'Room price:' + ` `}
                </Typography>
                <Typography  component='span'>
                    {room?.price === 0 ? 'Free Stay' : 'N' + room?. price}
                </Typography>
            </Box>
            
            <Box sx = {{alignItems: 'center', display: 'flex'  }}>
                <Typography variant = 'h6' component = 'span'>
                    {'Ratings: '}
                </Typography>
                <Rating
                name = 'room-ratings'
                defaultValue={3.5}
                precision={0.5}
                emptyIcon = {<StarBorder/>}/>
                
            </Box>

        </Stack>

    </Stack>

    
    <Stack
    sx= {{p: 3}}
    spacing= {2} 
    >
        <Stack
        direction= 'row'
        sx= {{
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        }}>
            <Box>
                <Typography variant = 'h6' component = 'span' >
                    {'Area Name: ' }
                </Typography>
                <Typography  component='span'>
                  {place?.areaName}
                </Typography>
            </Box>
            
            <Box sx = {{alignItems: 'center'}}>
                <Typography variant = 'h6' component = 'span'>
                    {'Address:' +   ` `}
                </Typography>
               <Typography  component='span' sx = {{ml: 2}}  >
                  {place?.fullAddress}

                </Typography>
                
            </Box>
        </Stack>

        <Stack display = 'flex'>
            <Typography variant = 'h6' component = 'span' >
                    {'Details: ' }
                </Typography>
                <Typography  component='span'>
                  {room?.description}
                </Typography>

        </Stack>


    </Stack>
 
 


 </Container>

</Dialog>
  )
}

export default Room
