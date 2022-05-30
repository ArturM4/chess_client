
import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { acceptFriend } from '../services/users';
import socket from '../socket/socket';

export function CustomNav({ user, setUser, notifications, setNotifications }) {

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

  const acceptFriendRequest = async (index, noti) => {
    await acceptFriend(noti)
    setNotifications((prev) => {
      let prevCopy = [...prev]
      prevCopy.splice(index, 1);
      return prevCopy
    })
  }

  const declineFriendRequest = (index) => {
    setNotifications((prev) => {
      let prevCopy = [...prev]
      prevCopy.splice(index, 1);
      return prevCopy
    })
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
            <NavDropdown disabled={!notifications.length > 0} title={'🔔' + notifications.length}>
              {notifications.length === 0 &&
                <NavDropdown.ItemText>
                  <div>No tens cap notificació</div>
                </NavDropdown.ItemText>}
              {notifications.map((noti, i) => {
                return (
                  <div key={i}>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText>
                      <div>{noti.senderUsername} vol ser el teu amic</div>
                      <Button onClick={() => acceptFriendRequest(i, noti)} variant="success">Acceptar</Button>{' '}
                      <Button onClick={() => declineFriendRequest(i)} variant="danger">Rebutjar</Button>
                    </NavDropdown.ItemText>
                  </div>
                )
              })}
              <div className='text-white'>________________________________________</div>
            </NavDropdown>
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
    </Navbar >
  )
}



