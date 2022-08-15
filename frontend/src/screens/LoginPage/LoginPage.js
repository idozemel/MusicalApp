import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./LoginPage.css";
import Loading from "../../components/Handlers/Loading";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && (
          <ErrorMessage variant="danger" className="inputs">
            {error}
          </ErrorMessage>
        )}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username </Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
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
          <Button variant="primary" size="lg" type="submit">
            LOGIN
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Not a member yet?{" "}
            <Link to="/register" style={{ textDecoration: "underline" }}>
              Click here
            </Link>{" "}
            to register.
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
