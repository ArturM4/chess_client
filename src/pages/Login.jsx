import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/login';
import { ErrorMessage } from '../components/ErrorMessage';
import socket from '../socket/socket';
import { useTranslation } from 'react-i18next';


export function Login({ setUser }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await login({ username, password })
      socket.emit("userLogged", user.info.id)
      setUser(user)
      navigate('/')
    } catch (error) {
      setErrorMsg(t("Login.errors.wrongCredentials"))
    }

  }

  return (
    <div className='p-4 mt-5 smallContainer'>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3 text-white">
          <Form.Label>{t("Login.username")}</Form.Label>
          <Form.Control type="text" placeholder={t("Login.username")} value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3 text-white">
          <Form.Label>{t("Login.password")}</Form.Label>
          <Form.Control type="password" placeholder={t("Login.password")} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <ErrorMessage msg={errorMsg} />
        <Button variant="primary" type="submit">
          {t("Login.login")}
        </Button>


      </Form>
    </div>
  )
}
