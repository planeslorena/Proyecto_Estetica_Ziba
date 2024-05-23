import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';

export function Menu() {
  const router = useRouter();
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
                <Nav className="menu justify-content-center  align-items-center flex-grow-1 pe-3">
                  <Nav.Link onClick={() => {router.push('/home')}} className='links'>INICIO</Nav.Link>
                  <Nav.Link href="#services" className='links'>SERVICIOS</Nav.Link>
                  <Nav.Link href="#contactInfo" className='links'>CONTACTO</Nav.Link>
                </Nav>
                <Nav className="align-items-center d-flex">
                    <Nav.Link className='cuenta' onClick={() => {router.push('/authPage')}}>CUENTA</Nav.Link>
                    <i className="bi bi-person-circle"></i>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
  