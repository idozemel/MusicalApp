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
                <div className="d-flex justify-content-between">
                  <Button as={Link} to="/mysongs" variant="outline-light">
                    Edit
                  </Button>
                  <Button as={Link} to="/mysongs" variant="danger">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="2" />
        </Row>
      </MainScreen>
    )
  );
  // return (
  //   <div class="container d-flex justify-content-center align-items-center">
  //     <div class="profileCard">
  //       <div class="mt-5 text-center">
  //         <p class="text">Name </p>
  //         <p class="text">Email </p>
  //         <button class="btn btn-primary btn-sm">change password</button>

  //         <div class="d-flex justify-content-between align-items-center mt-4 px-4">
  //           <div class="stats">
  //             <h6 class="mb-0">Followers</h6>
  //             <span>8,797</span>
  //           </div>

  //           <div class="stats">
  //             <h6 class="mb-0">Projects</h6>
  //             <span>142</span>
  //           </div>

  //           <div class="stats">
  //             <h6 class="mb-0">Ranks</h6>
  //             <span>129</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default MyProfilePage;
