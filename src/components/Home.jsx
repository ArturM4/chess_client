import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Board } from "./Board/Board";
import '../mainstyles.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket/socket";


export function Home() {
  const navigate = useNavigate();
  const [searchingGame, setSearchingGame] = useState(false);

  useEffect(() => {
    socket.on("gameInit", (gameId) => {
      navigate('/game/' + gameId)
    })
    return () => {
      socket.off('gameInit')
    }
  }, [navigate]);

  function handleSearchGame() {
    setSearchingGame(true)
    socket.emit('searchGame')
  }

  return (
    <>
      <Container className='p-4 mt-5' >
        <Row>
          <Col xs={12} md={3}>
            <Stack className="mx-auto">
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>Un Jugador</Button>
              <Button disabled={searchingGame} onClick={handleSearchGame} size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant='' >Multijugador</Button>
              {searchingGame && <p className='ms-md-2 mb-2 mb-md-4 fs-5 text-white'>Buscant partida...</p>}
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant='' onClick={() => navigate('challenge')}>Desafiar un amic</Button>
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>Canviar estils</Button>
            </Stack>
          </Col>
          <Col className="mt-3 mt-md-0" xs={12} md={9}>
            <Board />
          </Col>
        </Row>
      </Container>
    </>
  )
}
