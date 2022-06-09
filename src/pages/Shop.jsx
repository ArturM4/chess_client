import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Chessboard } from 'react-chessboard'
import { useCustomBoard } from '../hooks/useCustomBoard'
import { useResponsiveBoard } from '../hooks/useResponsiveBoard'

export function Shop() {

  const { boardWidth } = useResponsiveBoard()
  const [showBoard, setshowBoard] = useState(false);
  const [set, setSet] = useState('');
  const [board, setBoard] = useState('');

  const { customPieces, customDarkSquareStyle, customLightSquareStyle } = useCustomBoard(set, board)

  useEffect(() => {
    setshowBoard(true)
  }, [])

  return (
    <Container className='p-4 mt-5' >
      <Row>
        <Col xs={12} lg={6}>

          <Row>
            <Col xs={3} >


              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/classic/bP.png')} />
                <Card.Body>
                  <Card.Title>100💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setSet('') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/normal2/bP.png')} />
                <Card.Body>
                  <Card.Title>100💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setSet('normal2') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3}>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/normal1/bP.png')} />
                <Card.Body>
                  <Card.Title>100💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setSet('normal1') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/normal3/bP.png')} />
                <Card.Body>
                  <Card.Title>100💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setSet('normal3') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={3}>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/basic1/bP.png')} />
                <Card.Body>
                  <Card.Title>100💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setSet('basic1') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/normal4/bP.png')} />
                <Card.Body>
                  <Card.Title>100💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setSet('normal4') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
            </Col>


            <Col xs={3}>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/normalBoard.png')} />
                <Card.Body>
                  <Card.Title>150💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setBoard('normal') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
              <Card className='mb-3'>
                <Card.Img variant="top" src={require('../assets/classicBoard.png')} />
                <Card.Body>
                  <Card.Title>150💰</Card.Title>
                  <Button size='sm' className='mb-2' variant="warning">Comprar</Button>
                  <Button size='sm' onClick={() => { setBoard('classic') }} variant="secondary">Probar</Button>
                </Card.Body>
              </Card>
            </Col>
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
