import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import { useInterval } from '../hooks/useInterval';
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
  const [showBoard, setshowBoard] = useState(false);

  const [whiteLastMoveTime, setWhiteLastMoveTime] = useState(180000);
  const [blackLastMoveTime, setBlackLastMoveTime] = useState(180000);
  const [whiteTime, setWhiteTime] = useState(180000);
  const [blackTime, setBlackTime] = useState(180000);
  const [lastMoveDate, setLastMoveDate] = useState(new Date());

  const [clockStarted, setClockStarted] = useState(false);

  useEffect(() => {
    socket.emit('joinGame', gameId)
  }, [gameId]);

  useInterval(() => {
    if (game.turn() === 'w') {
      setWhiteTime(whiteLastMoveTime - ((new Date()).getTime() - lastMoveDate.getTime()))
    } else {
      setBlackTime(blackLastMoveTime - ((new Date()).getTime() - lastMoveDate.getTime()))
    }
  }, clockStarted ? 100 : null);

  useEffect(() => {

    socket.on("gameInit", (isWhite) => {
      setIsPlayerWhite(isWhite)
      setshowBoard(true)
    })

    return () => {
      socket.off('gameInit')
    }
  }, [isPlayerWhite]);


  const doMove = useCallback((from, to, promotion) => {
    const gameCopy = { ...game };
    const move = gameCopy.move({ from, to, promotion });
    if (move) {
      setGame(gameCopy);
      setBlackLastMoveTime(blackTime)
      setWhiteLastMoveTime(whiteTime)
      setLastMoveDate(new Date())
      if (gameCopy.history().length === 2)
        setClockStarted(true)
    }
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

  }, [game, isPlayerWhite, whiteTime, blackTime])

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

  function handlePromotion(p) {
    const move = promote(p)
    if (move)
      socket.emit('doMove', gameId, { from: move.from, to: move.to, promotion: move.promotion })
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

  function timeFormated(orientation) {
    let time = 0
    orientation === 'w' ? time = whiteTime : time = blackTime

    return Math.floor(time / (1000 * 60)).toString().padStart(2, '0') + ":"
      + (Math.floor(time / 1000) % 60).toString().padStart(2, '0') + "."
      + Math.floor(time % 1000 / 100)
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={0} lg={2}>
        </Col>
        <Col xs={12} md={10} lg={8}>
          <div className='boardWrapper'>
            {showBoard && <>
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
            </>}
          </div>
        </Col>
        <Col xs={12} md={2} lg={2}>
          {boardOrientation() === 'white' && <>
            <p className='fs-1 text-white'>{timeFormated('b')}</p>
            <p className='fs-1 text-white'>{timeFormated('w')}</p>
          </>}
          {boardOrientation() === 'black' && <>
            <p className='fs-1 text-white'>{timeFormated('w')}</p>
            <p className='fs-1 text-white'>{timeFormated('b')}</p>
          </>}
        </Col>
      </Row>

    </Container >
  )
}
