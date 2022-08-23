import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, userEdit } from "../../actions/userAction";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
const EditUserPage = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();

  const userGetter = useSelector((state) => state.getUser);
  const { loading, userInfo } = userGetter;


  const userEditter = useSelector((state) => state.editUser)
  const {error:editError} = userEditter;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setAge(userInfo.age);
      setGender(userInfo.gender);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userEdit(userInfo._id, password, name, gender, age));
    dispatch(login(userInfo.username, password));
    navigate("/myprofile");
  };

  return (
    <MainScreen title="EDIT">
      <div className="EditContainer">
        {(editError === "Wrong password") && (
          <ErrorMessage variant="danger" className="inputs">
            Wrong password
          </ErrorMessage>
        )}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="inputs"
              type="text"
              value={userInfo.username}
              disabled
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="inputs"
              type="email"
              value={userInfo.email}
              disabled
              placeholder="Enter email"
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
            <Button
              variant="outline-secondary"
              value={gender}
              onClick={(e) => setGender(e.target.childNodes[0].data)}
            >
              Male
            </Button>
            <Button
              variant="outline-secondary"
              value={gender}
              onClick={(e) => setGender(e.target.childNodes[0].data)}
            >
              Female
            </Button>
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
