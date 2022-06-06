import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { login } from '../services/login';
import { register } from '../services/users';
import socket from '../socket/socket';

export function Register({ setUser }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await register({ username, password })
      const user = await login({ username, password })
      socket.emit("userLogged", user.info.id)
      setUser(user)
      navigate('/')
    } catch (error) {
      if (error?.response?.data?.error === 'Incorrect format of username or password')
        setErrorMsg(t("Login.errors.wrongFormat"))
      else if (error?.response?.data?.error === 'Username already exists')
        setErrorMsg(t("Login.errors.userExists"))
      else
        setErrorMsg(t("Login.errors.GeneralError"))
    }

  }

  return (
    <div className='p-4 mt-5 smallContainer'>
      <Form onSubmit={handleRegister}>
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
          {t("Login.register")}
        </Button>


      </Form>
    </div>
  )
}
