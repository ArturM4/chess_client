
import i18next from 'i18next';
import React from 'react'
import { Button, Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { acceptFriend } from '../services/users';
import socket from '../socket/socket';

export function CustomNav({ user, setUser, notifications, setNotifications }) {

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();


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
    if (noti.type === 'friendRequest')
      await acceptFriend(noti)
    else if (noti.type === 'challenge')
      socket.emit("createGame", noti.senderId, noti.receiverId)

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

  function changeLanguage(lang) {
    i18next.changeLanguage(lang)
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={handleNav('/')}>AirChess</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            {user && <Nav.Link onClick={handleNav('friends')}>{t("CustomNav.friends")}</Nav.Link>}
          </Nav>
          <Nav>
            <NavDropdown disabled={!notifications.length > 0} title={'🔔' + notifications.length}>
              {notifications.length === 0 &&
                <NavDropdown.ItemText>
                  <div>{t("CustomNav.noNotifications")}</div>
                </NavDropdown.ItemText>}
              {notifications.map((noti, i) => {
                return (
                  <div key={i}>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText>
                      {noti.type === 'friendRequest'
                        ? <div>{noti.senderUsername} {t("CustomNav.friendRequest")}</div>
                        : <div>{noti.senderUsername} {t("CustomNav.friendChallenge")}</div>
                      }
                      <Button onClick={() => acceptFriendRequest(i, noti)} variant="success">{t("CustomNav.accept")}</Button>{' '}
                      <Button onClick={() => declineFriendRequest(i)} variant="danger">{t("CustomNav.cancel")}</Button>
                    </NavDropdown.ItemText>
                  </div>
                )
              })}
              <div className='text-white'>________________________________________</div>
            </NavDropdown>

            <NavDropdown title='⚙️' >
              <Dropdown>
                <Dropdown.Toggle variant="secondary" className='w-100 text-start'>
                  {t("CustomNav.language")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ca')}>Català</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('es')}>Castellano</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </NavDropdown>

            {!user
              ? <>
                <Nav.Link onClick={handleNav('login')}>{t("CustomNav.login")}</Nav.Link>
                <Nav.Link onClick={handleNav('register')}>{t("CustomNav.register")}</Nav.Link>
              </>
              : <>
                <Nav.Link onClick={handleLogout}>{t("CustomNav.logout")}</Nav.Link>
                <Navbar.Text> {user.info.username}</Navbar.Text>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}



