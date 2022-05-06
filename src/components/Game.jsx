import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import { usePromotion } from '../hooks/usePromotion';
import { useResponsiveBoard } from '../hooks/useResponsiveBoard';
import socket from '../socket/socket'
import { getPieceFromPosition, isPieceWhite } from '../utils/chessUtils';
import Promotion from './Board/Promotion';
import GameResult from './GameResult';

export function Game() {
  const gameId = useParams().id

  const [isPlayerWhite, setIsPlayerWhite] = useState(true);
  const [game, setGame] = useState(new Chess());
  const [showResult, setShowResult] = useState('');
  const [arePiecesDraggable, setArePiecesDraggable] = useState(true);
  const [kingInCheckSquare, setKingInCheckSquare] = useState({});
  const { checkPromotion, promote, isPromoting, getPromotionRow, cancelPromotion } = usePromotion(game, setGame, setKingInCheckSquare)
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

    if (gameCopy.in_check())
      setKingInCheckSquare({
        [getPieceFromPosition(game, { type: 'k', color: game.turn() })]: {
          boxShadow: '0 0 15px 8px rgb(153, 0, 0) inset'
        }
      })
    else
      setKingInCheckSquare({})

    if (gameCopy.game_over()) {
      setArePiecesDraggable(false)
      if (gameCopy.in_checkmate()) {
        if (gameCopy.turn() === 'w' === isPlayerWhite) {
          setShowResult('loss')
        }
        else {
          setShowResult('win')
        }
      }

      if (gameCopy.in_draw()) {
        setShowResult('draw')
      }

    }
    return move;

  }, [game, isPlayerWhite])

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
    if (move)
      socket.emit('doMove', gameId, { from: move.from, to: move.to, promotion: move.promotion })
  }
  return (
    <Container className='mt-5'>
      <div className='boardWrapper'>
        <GameResult showResult={showResult} setShowResult={setShowResult} />
        <Promotion isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} handlePromotion={handlePromotion} orientation={boardOrientation().charAt(0)} />
        <Chessboard
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          isDraggablePiece={isDraggablePiece}
          boardOrientation={boardOrientation()}
          onSquareClick={() => cancelPromotion()}
          onPieceDragBegin={() => cancelPromotion()}
          customSquareStyles={{ ...kingInCheckSquare }}
          arePiecesDraggable={arePiecesDraggable}
        />
      </div>
    </Container >
  )
}
