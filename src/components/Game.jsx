import { Chess } from 'chess.js';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import socket from '../socket/socket'

export function Game() {
  const gameId = useParams().id

  //estat per controlar la mida del taulell
  const [boardWidth, setBoardWidth] = useState();
  const [isPlayerWhite, setIsPlayerWhite] = useState();
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    function handleResize() {
      //obté la mida del div que envolta la taula i canvia la mida de la taula per adaptar-se
      const boardWrapper = document.getElementsByClassName('boardWrapper')[0];
      setBoardWidth(boardWrapper.offsetWidth - 25);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    socket.emit('joinGame', gameId)

    socket.on("gameInit", (isWhite) => {
      setIsPlayerWhite(isWhite)
    })

  }, [gameId]);


  function onPieceDrop(from, to) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from,
      to,
      promotion: 'q'
    });
    setGame(gameCopy);
    return move;
  }

  function isDraggablePiece({ piece }) {
    if (isPieceWhite(piece) === isPlayerWhite)
      return true
    return false
  }

  function isPieceWhite(piece) {
    if (piece.charAt(0) === 'w')
      return true
    return false
  }

  function boardOrientation(piece) {
    if (isPlayerWhite)
      return 'white'
    return 'black'
  }

  return (
    <Container className='mt-5'>
      <div className='boardWrapper'>
        <Chessboard
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          isDraggablePiece={isDraggablePiece}
          boardOrientation={boardOrientation()}
        />
      </div>
    </Container>
  )
}
