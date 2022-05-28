import { Button, Col, Container, Modal, Row, Stack } from "react-bootstrap";
import { Board } from "./Board/Board";
import '../mainstyles.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket/socket";


export function Home() {
  const navigate = useNavigate();
  const [searchingGame, setSearchingGame] = useState(false);
  const [showBoard, setshowBoard] = useState(false);
  const [chooseModeModal, setChooseModeModal] = useState(false);

  useEffect(() => {
    setshowBoard(true)
    return () => {
      socket.emit('cancelSearch')
    }
  }, []);


  useEffect(() => {
    socket.on("gameInit", (gameId) => {
      navigate('/game/' + gameId)
    })
    return () => {
      socket.off('gameInit')
    }
  }, [navigate]);

  function handleChooseMode() {
    setChooseModeModal(true)
  }
  function handleSearchGame(mode) {
    setChooseModeModal(false)
    setSearchingGame(true)
    socket.emit('searchGame', mode)
  }

  return (
    <>
      <Container className='p-4 mt-5' >
        <Row>
          <Col xs={12} md={3}>
            <Stack className="mx-auto">
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>Un Jugador</Button>
              <Button disabled={searchingGame} onClick={handleChooseMode} size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant='' >Multijugador</Button>
              {searchingGame && <p className='ms-md-2 mb-2 mb-md-4 fs-5 text-white'>Buscant partida...</p>}
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant='' onClick={() => navigate('challenge')}>Desafiar un amic</Button>
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>Canviar estils</Button>
            </Stack>
          </Col>
          <Col className="mt-3 mt-md-0" xs={12} md={9}>
            {showBoard &&
              <Board />}
          </Col>
        </Row>
      </Container>

      <Modal show={chooseModeModal} onHide={() => setChooseModeModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tria el mode de joc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={() => handleSearchGame('bullet')} size='lg' className='me-2 mb-2 py-3' >Bullet (1min)</Button>
          <Button onClick={() => handleSearchGame('blitz')} size='lg' className='me-2 mb-2 py-3' >Blitz (3min)</Button>
          <Button onClick={() => handleSearchGame('rapid')} size='lg' className='me-2 mb-2 py-3' >Rapid (10min)</Button>
          <Button onClick={() => handleSearchGame('classic')} size='lg' className='mb-2 py-3'  >Classic (30min)</Button>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}
