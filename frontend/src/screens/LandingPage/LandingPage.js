import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './LandingPage.css';
const LandingPage = () => {
  return (
    <div className='main'>
        <Container>
            <Row>
            <div className='intro-text'>
                <div>
                    <h1 className='title'>Welcome to Musica-App</h1>
                    <p className='subtitle'>Eize muzika atem olhim lauf ba avir</p>
                    <div className='buttonContainer'>
                        <Link to='/login'>
                            <Button size="lg" className='landingButton'>Best Songs</Button>
                        </Link>
                        <Link to='/register'>
                            <Button size="lg" className='landingButton' variant='outline-primary'>Genres</Button>
                        </Link>
                    </div>
                </div>
            </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage;