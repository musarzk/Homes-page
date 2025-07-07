


import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Lock, Menu } from "@mui/icons-material";
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import Sidebar from './sidebar/Sidebar';
import { useState } from "react";



const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue(); // ✅ Fixed: invoking the hooks

  const [isOpen, setIsOpen] = useState(true)

  return (

    <>
    
    <AppBar>
      <Container maxWidth ='lg' >
        <Toolbar disableGutters>

        {/* Menu icon - positioned to the right */}
        <Box sx={{ ml: 2 }}>
        <IconButton size='large' color='inherit' onClick = { () => setIsOpen(true)}>
          <Menu  sx={{ fontSize: '2rem' }} />
        </IconButton>
        </Box>
            
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'center',
              ml: 3,
            }}
          >
            <Typography
              variant='subtitle2'
              component='h1'
              noWrap
              sx={{ lineHeight: 1, fontSize: '1.8rem' }}
            >
              HOMES PAGE
            </Typography>
            <Typography
              variant='caption'
              component='p' // Changed to 'p' (you had 'h1' for both, which isn’t semantically ideal)
              sx={{ mt: 0.3, lineHeight: 0.5, fontSize: '1.3rem' }}
            >
              By MIRA
            </Typography>
          </Box>
        

          {/* Image logo for xs only */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img
              src="/logo1.png"
              alt="Dwellink Logo"
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </Box>

          {/* Auth logic */}
          {!currentUser ? (
            

            <Button
              color='inherit'
              startIcon={<Lock />}
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
              >
              Login
            </Button>
             

          ) : (
            <UserIcons />
          )}

          {/* Menu icon - positioned to the right */}
  {/* <Box sx={{ ml: 2 }}>
            <IconButton size='large' color='inherit' onClick = { () => setIsOpen(true)}>
              <Menu  sx={{ fontSize: '2rem' }} />
            </IconButton>
          </Box> */}


        </Toolbar>
      </Container>
    </AppBar>
    
    <Sidebar {...{isOpen, setIsOpen}} />
    </>
  );
};

export default NavBar;
