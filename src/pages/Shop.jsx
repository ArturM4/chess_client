import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Chessboard } from 'react-chessboard'
import { ShopItem } from '../components/ShopItem'
import { useCustomBoard } from '../hooks/useCustomBoard'
import { useResponsiveBoard } from '../hooks/useResponsiveBoard'
import { getUser } from '../services/users'

export function Shop({ user, setUser }) {

  const { boardWidth } = useResponsiveBoard()
  const [showBoard, setshowBoard] = useState(false);
  const [set, setSet] = useState('standard');
  const [board, setBoard] = useState('standard');

  const { customPieces, customDarkSquareStyle, customLightSquareStyle } = useCustomBoard(set, board)

  useEffect(() => {
    setshowBoard(true)
  }, [])

  useEffect(() => {
    if (user)
      getUser(user.info.id).then((result) => {
        setUser((prev) => {
          let updated = { ...prev }
          prev.info.coins = result.coins
          return updated
        })
      })
  }, [setUser])

  return (
    <Container className='p-4 mt-5' >

      <Row>
        <Col xs={12} lg={6}>
          {user && <p className='display-6 text-white'>{user.info.coins}💰</p>}
          <Row>
            <Col xs={3} ><ShopItem name={'standard'} isPiece={true} setItem={setSet} user={user} setUser={setUser} /></Col>
            <Col xs={3}><ShopItem name={'normal1'} isPiece={true} setItem={setSet} user={user} setUser={setUser} /></Col>
            <Col xs={3}><ShopItem name={'basic1'} isPiece={true} setItem={setSet} user={user} setUser={setUser} /></Col>
            <Col xs={3}><ShopItem name={'standard'} isPiece={false} setItem={setBoard} user={user} setUser={setUser} /></Col>
          </Row>
          <Row>
            <Col xs={3} ><ShopItem name={'normal2'} isPiece={true} setItem={setSet} user={user} setUser={setUser} /></Col>
            <Col xs={3}><ShopItem name={'basic2'} isPiece={true} setItem={setSet} user={user} setUser={setUser} /></Col>
            <Col xs={3}><ShopItem name={'normal4'} isPiece={true} setItem={setSet} user={user} setUser={setUser} /></Col>
            <Col xs={3}><ShopItem name={'classic'} isPiece={false} setItem={setBoard} user={user} setUser={setUser} /></Col>
          </Row>
        </Col>
        <Col className="mt-3 mt-md-0" xs={12} lg={6}>
          <div className='boardWrapper'>
            {showBoard && <Chessboard
              boardWidth={boardWidth}
              customDarkSquareStyle={customDarkSquareStyle()}
              customLightSquareStyle={customLightSquareStyle()}
              customPieces={customPieces()}
            />}
          </div>

        </Col>
      </Row>
    </Container>
  )
}
