import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Board } from "./Board/Board";
import '../mainstyles.css'
export function Home() {
  return (
    <>
      <Container className='p-4 mt-5 rounded-3' >
        <Row>
          <Col xs={12} md={3}>
            <Stack className="mx-auto">
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>Un Jugador</Button>
              <Button size='lg' className='c-386ecf ms-md-2 py-3 mb-2 mb-md-4' variant=''>Multijugador</Button>
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
