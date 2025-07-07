import React from 'react'
import NavBar from '../../components/NavBar';
import Login from '../../components/user/Login';
import Notification from '../../components/Notification';
import Loading from '../../components/Loading';
import BottomNav from '../../components/BottomNav';
import Room from '../../components/rooms/Room';

const Home = () => {
  return ( 
  <>
  <Loading/>
  <Notification/>
  <Login/>
  <NavBar/>
  <BottomNav/>
  <Room/>
  </>
  );
};

export default Home