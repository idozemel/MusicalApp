import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userInfo = localStorage.getItem('userInfo');
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      dispatch({type:USER_REGISTER_DONE}); //Just to clean up Redux storage.
      navigate("/");
    }
  }, [navigate, userInfo,dispatch]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register( email, username, password));
    }
  };


  return (
    <MainScreen title="REGISTER">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter Name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" size="lg" type="submit">
            REGISTER
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
