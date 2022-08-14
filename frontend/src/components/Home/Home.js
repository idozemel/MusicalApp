import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button/Button';
import {Routes, Route, useNavigate} from 'react-router-dom';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Login from '../Login/Login';

const Home = (props) => {
  const navigate = useNavigate();

  const navToLoginHandler= () => {
    navigate('/login');
  };

  const navToRegisterHandler= () => {
    navigate('/register');
  };

  //const cntx = useContext(AuthContext);
  return (
    <>
    <Card className={classes.home}>
      <h1>Welcome To Musical-App</h1>
      <h3>Please Log-in</h3>
      {/* <Button onClick={cntx.onLogIn}>Login</Button> */}
      <Button onClick={navToLoginHandler}>Login</Button>
      <p>Not a member yet? <u onClick={navToRegisterHandler}>Click here</u> to sign up!</p>
    </Card>



    {/* <Routes>
      <Route path="/login" element={<Login />} />
    </Routes> */}
    </>
  );

  
};

export default Home;
