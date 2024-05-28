import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'
import { Dropdown, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

export function Menu() {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  let clientName = 'Lore';
  const isLoged = () => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      setIsActive(true);
    }
    router.push('/authPage');
  }

  const logOut = () => {
    sessionStorage.removeItem('accessToken');
    router.push('/home');
  }

    return (
      <div>
      
      <Navbar key={'md'} expand={'md'} className="mb-3 d-flex flex-row justify-content-evenly ">
        <Container fluid>
        < div>
           

           <img className='img-logo' src="/imagenes/logoZiba.jpg" alt="logo ziba"   
           width="200"
           height="75"
          
         />
       
       </div>
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
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <div>
            <Nav className="align-items-center d-flex">
                 { !isActive ? (
                      <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Hola, {clientName}!
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {router.push('/client')}}>Perfil</Dropdown.Item>
                        <Dropdown.Item onClick={logOut}>Cerrar sesión</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    ) : (
                      <Nav.Link className='cuenta' onClick={isLoged}>CUENTA</Nav.Link>
                    )
                  }             
                    <i className="bi bi-person-circle"></i>
              
                </Nav>
            </div>
        </Container>
      </Navbar>
      </div>
    );
  }