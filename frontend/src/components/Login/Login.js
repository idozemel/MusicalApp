import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import {useNavigate} from 'react-router-dom';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailSate,dispatchEmail] = useReducer((state,action)=>{

    if(action.type === "USER_EMAIL"){
      return {value: action.val, isValid:action.val.includes("@") };
    };
    if(action.type === "USER_EMAIL_VALIDATION"){
      return {value:state.value, isValid:state.value.includes("@")};
    }
    return {value: '',isValid:false};
  },{
    value: '',
    isValid: false
  })

  const [passwordSate,dispatchPW] = useReducer((state,action)=>{
    if(action.type === "USER_PW"){
      return {value:action.val, isValid:action.val.trim().length > 6 };
    }
    if(action.type === "USER_PW_VALIDATION"){
      return {value:state.value, isValid:state.value.trim().length > 6};
    }
    return {value:'',isValid:false};
  },{
    value:'',
    isValid:false
  });
  const cntx = useContext(AuthContext); 
  
  const emailInputRef = useRef(emailSate.value);
  const passwordInputRef = useRef(passwordSate.value);

  //Checking if both email&PW is valid, and puts them in another object for validation
  const {isValid:emailIsValid} = emailSate; //The point for it, is for useEffect not to run
  const {isValid:passwordIsValid} = passwordSate; //if already the validation is true, and the component is still changing.

  useEffect(()=> {
    const timer = setTimeout(() => {
      //console.log("typing"); Waiting for 500 before typing it.
      setFormIsValid(
        emailIsValid && passwordIsValid)
    }
    ,500)
    return () => { //Returns function on useEffect launches right when the component creates and b4 the main useEffect function.
      clearTimeout(timer); //Cleaning the setTimeout timer so it wont send request to server
      //console.log("cleanup") Runs when ever cleanup runs
    }
  },[emailIsValid,passwordIsValid])


  const emailChangeHandler = (event) => {
    dispatchEmail({type:"USER_EMAIL", val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPW({type:"USER_PW", val:event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"USER_EMAIL_VALIDATION"})
  };

  const validatePasswordHandler = () => {
    dispatchPW({type:"USER_PW_VALIDATION"})
  };

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      cntx.onLogIn(emailSate.value, passwordSate.value);
      navigate('/');
    }
    else if(!emailIsValid){
      emailInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input          //E-mail input
        ref={emailInputRef}
        id="email"
        name="E-Mail"
        type="email"
        isValid={emailIsValid}
        value={emailSate.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler} />

        <Input          //Password input
        ref={passwordInputRef}
        id="password"
        name="Password"
        type="password"
        isValid={passwordIsValid}
        value={passwordSate.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler} />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
