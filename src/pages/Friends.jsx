
import React, { useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import socket from '../socket/socket'

export function Friends({ user }) {
  const [addFriendModal, setAddFriendModal] = useState(false)
  const [friendUsername, setFriendUsername] = useState('')

  const handleAddFriend = (e) => {
    e.preventDefault()
    setAddFriendModal(false)
    setFriendUsername('')
    socket.emit("friendRequest", friendUsername, user.info.id, user.info.username)
  }
  return (
    <>
      {user && <>
        <div className='mt-5 px-3 mediumContainer'>
          <Button onClick={() => setAddFriendModal(true)} className='mb-3 float-right'>Afegir nou amic </Button>

          <ListGroup>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
            <ListGroup.Item className='dark'>Pablo</ListGroup.Item>
          </ListGroup>
        </div>


        <Modal show={addFriendModal} onHide={() => setAddFriendModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Indica el nom d'usuari del nou amic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddFriend}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Username" value={friendUsername} onChange={(e) => setFriendUsername(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enviar sol·licitud
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>}
    </>
  )
}
