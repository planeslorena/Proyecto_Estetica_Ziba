import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Menu() {
    return (
      <Navbar key={'md'} expand={'md'} className="mb-3">
        <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${'md'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'md'}`}>
                  ZIBÁ
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="menu justify-content-center flex-grow-1 pe-3">
                  <Nav.Link href="#home" className='links'>INICIO</Nav.Link>
                  <Nav.Link href="#servicios" className='links'>SERVICIOS</Nav.Link>
                  <Nav.Link href="#contactos" className='links'>CONTACTO</Nav.Link>
                </Nav>
                <Nav className="align-items-center d-flex">
                    <Nav.Link className='cuenta' href='#login'>CUENTA</Nav.Link>
                    <img width="38" height="38" src="https://img.icons8.com/material-rounded/24/423155/user-male-circle.png" alt="user-male-circle"/>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
  