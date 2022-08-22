import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { USER_REGISTER_DONE } from "../../constants/userConstants";

const EditUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userGetter = useSelector((state) => state.getUser);
  const { loading, error, userInfo } = userGetter;
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== 1) { //todo bycrpt pw and equals to pw
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(email, userInfo.username, password));
    }
  };

  return (
    <MainScreen title="EDIT">
      <div className="EditContainer">
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
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              value={userInfo.username}
              disabled
              placeholder="Enter Name"
            />
          </Form.Group> 
          {/* To put in outline */}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="inputs"
              type="email"
              value={userInfo.email}
              disabled
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              value={userInfo.name}
              placeholder="Enter first name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              className="inputs"
              type="number"
              value={userInfo.age}
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Re-Enter your password</Form.Label>
            <Form.Control
              className="inputs"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Choose Gender</Form.Label>
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" value={gender} onClick={e => setGender(e.target.childNodes[0].data)}>Male</Button>
            <Button variant="outline-secondary" value={gender} onClick={e => setGender(e.target.childNodes[0].data)}>Female</Button>
          </InputGroup>

          <Button variant="primary" size="lg" type="submit">
            EDIT
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default EditUserPage;
