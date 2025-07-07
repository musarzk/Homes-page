import { Close, Send } from '@mui/icons-material'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'

import { useRef } from 'react';
import { useValue } from '../../context/ContextProvider';
import { updateProfile } from '../../actions/user';


const Profile = () => {

    const {state: {profile, currentUser}, dispatch} = useValue ();
    const handleClose = () => {

        dispatch ({type:'UPDATE_PROFILE', payload:{...profile, open: false}})
    }
    
    const handleChange = (e) =>{
        const file = e.target.files[0]
        if(file){
            const photoURL = URL.createObjectURL(file)
            dispatch ({type:'UPDATE_PROFILE', payload:{...profile, file, photoURL}})
        }
    } 

     const  handleSubmit = (e) =>{
        e.preventDefault();
        const name = nameRef.current.value
       updateProfile(currentUser, {name, file: profile.file}, dispatch) // pass username and photo file to the new function in the user action
    }

    const nameRef = useRef();

  return (

    <Dialog
      open={profile.open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          margin: 'auto',
          overflow: 'hidden',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle>
       Profile
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Update your profile using these fields
          </DialogContentText>

          
            <TextField
           
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              required
              default ={currentUser?.name}
            />
        
          <label htmlFor='profilePhoto'>
          <input 
          accept='image/*'
          id='profilePhoto'
          type='file'
          style={{display:'none'}}
          onChange={handleChange}/>
          <Avatar
          src={profile.photoURL}
          sx={{width:75, height:75, cursor:'pointer'}}
          />
          </label>
         
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
           Update
          </Button>
        </DialogActions>
      </form>
      
    </Dialog>
  )
}

export default Profile