import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/dashboard/Home';


const App = () => {
  return ( 
  <>
  <BrowserRouter>
  <Routes>
    <Route path = 'dashboard/*' element ={<Dashboard/>}/>
    <Route path = '*' element = {<Home/>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
};

export default App