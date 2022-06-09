import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Chessboard } from 'react-chessboard'
import { ShopItem } from '../components/ShopItem'
import { useCustomBoard } from '../hooks/useCustomBoard'
import { useResponsiveBoard } from '../hooks/useResponsiveBoard'

export function Shop({ user }) {

  const { boardWidth } = useResponsiveBoard()
  const [showBoard, setshowBoard] = useState(false);
  const [set, setSet] = useState('standard');
  const [board, setBoard] = useState('standard');

  const { customPieces, customDarkSquareStyle, customLightSquareStyle } = useCustomBoard(set, board)

  useEffect(() => {
    setshowBoard(true)
  }, [])

  return (
    <Container className='p-4 mt-5' >
      <Row>
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={3} ><ShopItem name={'standard'} price={100} isPiece={true} setItem={setSet} user={user} /></Col>
            <Col xs={3}><ShopItem name={'normal1'} price={100} isPiece={true} setItem={setSet} user={user} /></Col>
            <Col xs={3}><ShopItem name={'basic1'} price={100} isPiece={true} setItem={setSet} user={user} /></Col>
            <Col xs={3}><ShopItem name={'standard'} price={150} isPiece={false} setItem={setBoard} user={user} /></Col>
          </Row>
          <Row>
            <Col xs={3} ><ShopItem name={'normal2'} price={100} isPiece={true} setItem={setSet} user={user} /></Col>
            <Col xs={3}><ShopItem name={'normal3'} price={100} isPiece={true} setItem={setSet} user={user} /></Col>
            <Col xs={3}><ShopItem name={'normal4'} price={100} isPiece={true} setItem={setSet} user={user} /></Col>
            <Col xs={3}><ShopItem name={'classic'} price={150} isPiece={false} setItem={setBoard} user={user} /></Col>
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
