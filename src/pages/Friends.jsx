
import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { getUser } from '../services/users'
import socket from '../socket/socket'

export function Friends({ user }) {
  const [addFriendModal, setAddFriendModal] = useState(false)
  const [friendUsername, setFriendUsername] = useState('')
  const [friends, setFriends] = useState([])
  const { t } = useTranslation();

  const handleAddFriend = (e) => {
    e.preventDefault()
    setAddFriendModal(false)
    setFriendUsername('')
    socket.emit("friendRequest", friendUsername, user.info.id, user.info.username)
  }

  useEffect(() => {
    getUser(user.info.id).then((result) => {
      setFriends(result.friends)
    })
  }, [user.info.id])

  const challengeFriend = (friendId) => {
    socket.emit("challengeFriend", friendId, user.info.id, user.info.username)
  }
  return (
    <>
      {user && <>
        <div className='mt-5 px-3 mediumContainer'>
          <Button onClick={() => setAddFriendModal(true)} className='mb-3 float-right'>{t("Friends.addNew")}</Button>

          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: '#0b0b0c', color: '#fff' }}>{t("Friends.friends")}</ListGroup.Item>
            {friends.map((friend, i) => {
              return (
                <ListGroup.Item key={i} className='dark'>{friend.username}<Button onClick={() => challengeFriend(friend.id)} variant='secondary' className='ms-3' size='sm'>{t("Friends.challenge")}</Button></ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>


        <Modal show={addFriendModal} onHide={() => setAddFriendModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{t("Friends.newFormTitle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddFriend}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder={t("Friends.username")} value={friendUsername} onChange={(e) => setFriendUsername(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {t("Friends.sendRequest")}
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
