import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Chessboard } from "react-chessboard";

export function Home() {
  return (
    <>


      <Container className='p-4 mt-5 rounded-3 bg-secondary' >
        <Row>
          <Col xs={3}>
            <div>
              <h1>Escacs</h1>
              <Stack className="mx-auto">
                <Button size='lg' className='ms-2 py-3 mb-4'>Un Jugador</Button>
                <Button size='lg' className='ms-2 py-3 mb-4'>Multijugador</Button>
                <Button size='lg' className='ms-2 py-3'>Canviar estils</Button>
              </Stack>
            </div>
          </Col>
          <Col xs={9}>
            <Chessboard />
          </Col>
        </Row>
      </Container>
    </>
  )
}
