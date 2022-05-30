
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import socket from '../socket/socket';

export function CustomNav({ user, setUser }) {

  const navigate = useNavigate();
  const location = useLocation();
  const handleNav = (path) => () => {
    let replace = false;
    if (matchPath(path, location.pathname) !== null) // path es igual al actual
      replace = true; //si es igual el reemplacem perque no s'acumuli al history
    navigate(path, { replace })
  }

  const handleLogout = () => {
    socket.emit("userLogout", user.info.id)
    setUser(null)
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={handleNav('/')}>Escacs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link onClick={handleNav('game')}>Jugar</Nav.Link>
            {user && <Nav.Link onClick={handleNav('friends')}>Amics</Nav.Link>}
          </Nav>
          <Nav>
            {!user
              ? <>
                <Nav.Link onClick={handleNav('login')}>Iniciar sessió</Nav.Link>
                <Nav.Link onClick={handleNav('register')}>Registrar-se</Nav.Link>
              </>
              : <>
                <Nav.Link onClick={handleLogout}>Tancar sessió</Nav.Link>
                <Navbar.Text>| {user.info.username}</Navbar.Text>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}



