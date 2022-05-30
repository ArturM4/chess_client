import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/login';
import { ErrorMessage } from '../components/ErrorMessage';
import socket from '../socket/socket';


export function Login({ setUser }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await login({ username, password })
      socket.emit("userLogged", user.info.id)
      setUser(user)
      navigate('/')
    } catch (error) {
      setErrorMsg('Usuari o contrasenya incorrectes')
    }

  }

  return (
    <div className='p-4 mt-5 smallContainer'>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3 text-white">
          <Form.Label>Nom d'usuari</Form.Label>
          <Form.Control type="text" placeholder="Nom d'usuari" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3 text-white">
          <Form.Label>Contrasenya</Form.Label>
          <Form.Control type="password" placeholder="Contrasenya" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <ErrorMessage msg={errorMsg} />
        <Button variant="primary" type="submit">
          Login
        </Button>


      </Form>
    </div>
  )
}
