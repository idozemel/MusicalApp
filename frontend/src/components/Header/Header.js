import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  const user = useSelector((state) => state.getUser);
  const { userInfo:isAdmin } = user;


  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">MusicApp</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline="true"></Form>
          </Nav>
          {isAdmin?.isAdmin && (
            <Nav>
              <Nav.Link as={Link} to="/admin">
                Admin Page
              </Nav.Link>
            </Nav>
          )}
          {userInfo && (
            <Nav>
              <Nav.Link as={Link} to="/myProfile">
                My Profile
              </Nav.Link>
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </Nav>
          )}
          {!userInfo && (
            <Nav>
              <Link to="login">Login</Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
