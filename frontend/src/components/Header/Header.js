import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Musical-App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline="true">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2" // <img src= alt= />
              />
            </Form>
          </Nav>
          {userInfo && (
            <Nav>
              <Nav.Link>
                <Link to="mysongs">My Songs</Link>
              </Nav.Link>
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/myProfile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {!userInfo && (
            <Nav>
              <Nav.Link>
                <Link to="login">Login/Register</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
