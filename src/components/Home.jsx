import { Container } from "react-bootstrap";
import { Chessboard } from "react-chessboard";

export function Home() {
  return (
    <>

      <Container className='p-4 mt-5 rounded-3 bg-secondary d-flex' >
        <div>
          <h1>Escacs</h1>
          <button>Un jugador</button><br />
          <button>Multijugador</button><br />
          <button>Canviar estils</button>
        </div>
        <Chessboard />

      </Container>
    </>
  )
}
