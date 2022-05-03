import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import { usePromotion } from '../hooks/usePromotion';
import { useResponsiveBoard } from '../hooks/useResponsiveBoard';
import socket from '../socket/socket'
import { isPieceWhite } from '../utils/chessUtils';
import Promotion from './Board/Promotion';

export function Game() {
  const gameId = useParams().id

  const [isPlayerWhite, setIsPlayerWhite] = useState(true);
  const [game, setGame] = useState(new Chess());
  const { checkPromotion, promote, isPromoting, getPromotionRow } = usePromotion(game, setGame)
  const { boardWidth } = useResponsiveBoard()

  useEffect(() => {
    socket.emit('joinGame', gameId)

    socket.on("gameInit", (isWhite) => {
      setIsPlayerWhite(isWhite)
    })

    return () => {
      socket.off('gameInit')
    }
  }, [gameId]);

  const doMove = useCallback((from, to, promotion) => {
    const gameCopy = { ...game };
    const move = gameCopy.move({ from, to, promotion });
    if (move)
      setGame(gameCopy);
    return move;
  }, [game])

  useEffect(() => {
    socket.on("moveDone", ({ from, to, promotion }) => {
      doMove(from, to, promotion)
    })
    return () => {
      socket.off('moveDone')
    }
  }, [gameId, doMove]);


  function onPieceDrop(from, to) {
    if (checkPromotion(from, to) === true)
      return false
    let move = doMove(from, to)
    if (move)
      socket.emit('doMove', gameId, { from: move.from, to: move.to })
    return move;
  }

  function isDraggablePiece({ piece }) {
    if (isPieceWhite(piece) === isPlayerWhite)
      return true
    return false
  }

  function boardOrientation() {
    if (isPlayerWhite)
      return 'white'
    return 'black'
  }

  function handlePromotion(p) {
    const move = promote(p)
    console.log(move)
    if (move)
      socket.emit('doMove', gameId, { from: move.from, to: move.to, promotion: move.promotion })
  }
  return (
    <Container className='mt-5'>
      <div className='boardWrapper'>
        <Promotion isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} handlePromotion={handlePromotion} />
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
