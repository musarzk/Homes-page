import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import PasswordField from './PasswordField';
import { Close, Send } from '@mui/icons-material';
import GoogleOneTaplogin from './GoogleOneTaplogin';
import { login, register } from '../../actions/user';
import { useValue } from '../../context/ContextProvider';

const Login = () => {
  const { state: {openLogin}, dispatch } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   const email = emailRef.current.value;
   const password =passwordRef.current.value;
   
  //  send login request to the server in case it is not register and return
  if(!isRegister) return login({email, password}, dispatch);

  const name = nameRef.current.value;
  const confirmPassword= confirmPasswordRef.current.value;
  if(password !== confirmPassword)
    return dispatch({
      type:'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'Passwords do not match'
      },
  
    });
    //  Send register request
    register({name, email, password}, dispatch);
  };

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');

    if (openLogin) {
      if (isRegister && nameRef.current) {
        nameRef.current.focus();
      } else if (emailRef.current) {
        emailRef.current.focus();
      }
    }
  }, [isRegister, openLogin]);

  return (
    <Dialog
      open={openLogin}
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
        {title}
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
            Please fill in your information in the fields below:
          </DialogContentText>

          {isRegister && (
            <TextField
           
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              required
            />
          )}

          <TextField
          autoFocus
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'If you already have an account, click here to'
          : "If you don't have an account, click here to"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '24px', mb: '10px' }}>
        <GoogleOneTaplogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
