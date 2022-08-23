import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { deleteUser } from "../../services/userService";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getFilterUsers } from "../../actions/adminAction";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.getFilterUsers);
  const { loading, error, filterUsers } = usersList;
  const user = useSelector((state) => state.getUser);
  const { userInfo } = user;
  const [userToDelete, setUserToDelete] = useState();
  const [filters, setFilters] = useState({
    age: [14, 80],
    text: "",
    gender: "",
  });

  useEffect(() => {
    if (!filterUsers) dispatch(getFilterUsers(filters));
    if (!userInfo) dispatch(getUser());
  }, [userInfo, filterUsers, filters, dispatch]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setUserToDelete(user);
    setShow(true);
  };

  const deleteHandler = async () => {
    await deleteUser(userToDelete._id);
    dispatch(getFilterUsers(filters));
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getFilterUsers(filters));
  };

  return (
    <MainScreen title="Hello Admin">
      <Button>
        <Link to={"/dashboard"}> Dashboard</Link>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure delete {userToDelete?.username}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteHandler();
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {filterUsers && userInfo && (
        <>
          <Form
            className="d-flex justify-content-around align-items-center "
            onSubmit={searchHandler}
          >
            <Form.Group className="w-25">
              <Form.Label>
                Age {filters.age[0]} - {filters.age[1]}
              </Form.Label>
              <Slider
                draggableTrack
                range
                min={14}
                max={80}
                defaultValue={filters.age}
                value={filters.age}
                onChange={(age) =>
                  setFilters((filters) => ({ ...filters, age }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                placeholder="Search"
                value={filters.text}
                onChange={(ev) =>
                  setFilters((filters) => ({
                    ...filters,
                    text: ev.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={filters.gender}
                onChange={(ev) =>
                  setFilters((filters) => ({
                    ...filters,
                    gender: ev.target.value || "",
                  }))
                }
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Form.Group>
            <Button className="mt-4" variant="primary" size="lg" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
      {filterUsers &&
        userInfo &&
        filterUsers
          ?.filter((user) => user._id !== userInfo._id)
          .map((user) => {
            return (
              <Accordion key={user._id}>
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Header as={Card.Text} variant="link">
                        {user.username}
                      </Accordion.Header>
                    </span>
                    <div>
                      <Button
                        variant="light"
                        className="mx-2"
                        onClick={() => handleShow(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge bg="success">Username - {user.username}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.age}</p>
                        <p>{user.gender}</p>
                        <footer>
                          Admin -{" "}
                          <strong>
                            {user.isAdmin.toString().charAt(0).toUpperCase() +
                              user.isAdmin.toString().slice(1)}
                          </strong>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Card>
              </Accordion>
            );
          })}
    </MainScreen>
  );
};

export default AdminPage;
