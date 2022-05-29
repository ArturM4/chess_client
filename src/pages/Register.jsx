import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { login } from '../services/login';
import { register } from '../services/users';

export function Register({ setUser }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await register({ username, password })
      const user = await login({ username, password })
      setUser(user)
      navigate('/')
    } catch (error) {
      if (error?.response?.data?.error === 'Incorrect format of username or password')
        setErrorMsg('El nom d\'usuari no pot estar buit i la contrasenya ha de tenir més de 5 caràcters')
      else if (error?.response?.data?.error === 'Username already exists')
        setErrorMsg('Aquest nom d\'usuari ja existeix')
      else
        setErrorMsg('ha sorgit un error, intenta-ho de nou més tard')
    }

  }

  return (
    <div className='p-4 mt-5 smallContainer'>
      <Form onSubmit={handleRegister}>
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
          Registrar-se
        </Button>


      </Form>
    </div>
  )
}
