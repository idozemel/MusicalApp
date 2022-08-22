import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { USER_REGISTER_DONE } from "../../constants/userConstants";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      dispatch({ type: USER_REGISTER_DONE }); //Just to clean up Redux storage.
      navigate("/");
    }
  }, [navigate, userInfo, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    }
    else if(gender.length < 3){
      setMessage("Choose a gender");
    }
    else if(age < 13){
      setMessage("You must be over 14 to register");
    }
    else {
      setMessage(null);
      dispatch(register(email, username, password,gender,age,name)); //Need to add gender age and first name here, also on the action.
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="registerContainer">
        {error && (
          <ErrorMessage variant="danger" className="inputs">
            {error}
          </ErrorMessage>
        )}
        {message && (
          <ErrorMessage variant="danger" className="inputs">
            {message}
          </ErrorMessage>
        )}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="inputs"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              value={name}
              placeholder="Enter first name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              className="inputs"
              type="number"
              value={age}
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="inputs"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="inputs"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Choose Gender</Form.Label>
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" value={gender} onClick={e => setGender(e.target.childNodes[0].data)}>Male</Button>
            <Button variant="outline-secondary" value={gender} onClick={e => setGender(e.target.childNodes[0].data)}>Female</Button>
          </InputGroup>

          <Button variant="primary" size="lg" type="submit">
            REGISTER
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
