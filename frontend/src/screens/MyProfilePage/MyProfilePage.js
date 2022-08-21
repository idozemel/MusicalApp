import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyProfilePage.css";

import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/userAction"
const MyProfilePage = () => {
  const user = useSelector((state) => state.getUser);
  const { userInfo } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUser());
    }
  }, [dispatch, userInfo]);

  return userInfo && (
    <MainScreen title="My Profile">
      <Row className="m-auto align-self-center">
        <Col xs="2" />
        <Col>
          <Card
            className="mb-4"
            style={{
              height: "28vh",
              display: "flex",
            }}
          >
            <Card.Body>
              <Card.Title>
              <h4><Badge pill bg="badge bg-dark">User Name</Badge></h4>
              <h2><Badge pill bg="secondary"><strong style={{justifyContent:"center", alignSelf:"center"}}>{userInfo.username}</strong></Badge></h2>
              </Card.Title>
              <br />
              <Card.Text>
              <h4><Badge pill bg="badge bg-dark">Email</Badge></h4>
              <h2><Badge pill bg="secondary"><strong style={{justifyContent:"center", alignSelf:"center"}}>{userInfo.email}</strong></Badge></h2>
              </Card.Text>
              <br />
              <div style={{ position: "absolute", left: "0", paddingLeft: "15px" }}>
              <Button as={Link} to="/mysongs" variant="outline-light">Edit</Button>
              </div>
              <div style={{ position: "absolute", right: "0", paddingRight: "15px" }}>
              <Button as={Link} to="/mysongs" variant="danger">Delete</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="2" />
      </Row>
    </MainScreen>
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
