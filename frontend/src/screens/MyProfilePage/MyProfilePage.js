import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyProfilePage.css";

import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/userAction";
const MyProfilePage = () => {
  const user = useSelector((state) => state.getUser);
  const { userInfo } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUser());
    }
  }, [dispatch, userInfo]);

  return (
    userInfo && (
      <MainScreen title="My Profile">
        <Row className="m-auto align-self-center">
          <Col xs="2" />
          <Col>
            <Card
              className="mb-4"
              style={{
                display: "flex",
              }}
            >
              <Card.Body>
                <Card.Title className="d-flex flex-column">
                  <Badge pill bg="badge bg-dark fs-5">
                    User Name
                  </Badge>
                  <Badge bg="secondary" className="p-3 mt-2 fs-2">
                    <strong
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      {userInfo.username}
                    </strong>
                  </Badge>
                </Card.Title>
                <br />
                <Card.Text className="d-flex flex-column">
                  <Badge pill bg="badge bg-dark fs-5">
                    Email
                  </Badge>
                  <Badge bg="secondary" className="p-3 mt-2 fs-2">
                    <strong
                      style={{ justifyContent: "center", alignSelf: "center" }}
                    >
                      {userInfo.email}
                    </strong>
                  </Badge>
                </Card.Text>
                <br />
                <Button as={Link} to="/user/edit" variant="outline-light">
                  Edit
                </Button>
                <Button variant="light">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="2" />
        </Row>
      </MainScreen>
    )
  );
};

export default MyProfilePage;
