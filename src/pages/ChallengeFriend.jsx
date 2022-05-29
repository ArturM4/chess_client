import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import socket from '../socket/socket'

export function ChallengeFriend() {
  const navigate = useNavigate();
  const [gameUrl, setGameUrl] = useState('');
  const [gameId, setGameId] = useState('');

  useEffect(() => {

    let id = uuid()
    setGameId(id)
    socket.emit('createGame', id)
    let path = window.location.protocol + '//' + window.location.host + '/game/' + id;
    setGameUrl(path)
  }, []);

  useEffect(() => {
    socket.on("gameInit", () => {
      navigate('/game/' + gameId)
    })
    return () => {
      socket.off('gameInit')
    }
  }, [gameId, navigate]);

  return (
    <Container className='p-4 mt-5' >
      <Form.Control value={gameUrl} type="text" readOnly />
    </Container>
  )
}
