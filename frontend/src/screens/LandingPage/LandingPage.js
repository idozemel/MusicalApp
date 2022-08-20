import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Musica-App</h1>
              <div className="buttonContainer">
                <Link to="/songs">
                  <Button size="lg" className="landingButton">
                    Songs
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button size="lg" className="landingButton">
                    Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
