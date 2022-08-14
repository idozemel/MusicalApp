import React, { useContext } from 'react';

import Users from './components/Users/Users';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register/Register';

function App() {

//const cntx = useContext(AuthContext);
  return (
    <Router>
      <MainHeader/>
      <main>
      <Routes>
        {/* {!cntx.isLoggedIn && <Login />} */}
        {/* <Home /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<Users />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
