import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import { usePromotion } from '../hooks/usePromotion';
import { useInterval } from '../hooks/useInterval';
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

  const [yourLastMoveTime, setYourLastMoveTime] = useState(20000);
  const [opponentLastMoveTime, setOpponentLastMoveTime] = useState(20000);
  const [yourTime, setYourTime] = useState(20000);
  const [opponentTime, setOpponentTime] = useState(20000);
  const lastMoveDate = useRef();

  useEffect(() => {
    socket.emit('joinGame', gameId)
  }, [gameId]);


  const yourTimer = useInterval(() => {

    console.log('you', lastMoveDate.current.getTime(), yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime()), new Date().getTime())
    let time = yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    if (time <= 0) {
      console.log("loss", yourTime, opponentTime, yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime()))
      gameOver('loss')
    }
    setYourTime(time)

  }, 100);

  const opponentTimer = useInterval(() => {

    console.log('opp', lastMoveDate.current.getTime())
    let time = opponentLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    if (time <= -1000) {
      console.log("win", yourTime, opponentTime, opponentLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime()))
      gameOver('win')
    }
    setOpponentTime(time)

  }, 100);


  useEffect(() => {

    socket.on("gameInit", (isWhite) => {
      setIsPlayerWhite(isWhite)
      setshowBoard(true)
      lastMoveDate.current = new Date()
      if (isWhite)
        yourTimer.start()
      else
        opponentTimer.start()
    })

    return () => {
      socket.off('gameInit')
    }
  }, [isPlayerWhite, yourTimer, opponentTimer]);


  const doMove = useCallback((from, to, promotion) => {
    const gameCopy = { ...game };
    const move = gameCopy.move({ from, to, promotion });
    if (move) {
      setGame(gameCopy);
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

  }, [game, isPlayerWhite])

  useEffect(() => {
    socket.on("moveDone", ({ from, to, promotion }, oppTime) => {
      console.log("moveDone", yourTime, opponentTime, oppTime)

      opponentTimer.stop()
      setOpponentLastMoveTime(oppTime)
      setOpponentTime(oppTime)
      lastMoveDate.current = new Date()
      yourTimer.start()

      doMove(from, to, promotion)
      socket.emit('receivedMove', gameId)
    })
    return () => {
      socket.off('moveDone')
    }
  }, [gameId, doMove, yourTime, opponentTime, yourTimer, opponentTimer]);


  useEffect(() => {
    socket.on("oppponentReceivedMove", () => {
      console.log("oppponentReceivedMove", yourTime, opponentTime)
      lastMoveDate.current = new Date()
      opponentTimer.start()
    })

    return () => {
      socket.off('oppponentReceivedMove')
    }
  }, [yourTime, opponentTime, opponentTimer]);

  function onPieceDrop(from, to) {
    let currentYourTime = yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    console.log("onPieceDrop", yourTime, opponentTime, new Date().getTime(), yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime()))

    if (currentYourTime <= 0) {
      gameOver('loss')
      return
    }
    if (checkPromotion(from, to) === true)
      return false
    let move = doMove(from, to)
    if (move) {

      yourTimer.stop()
      setYourLastMoveTime(currentYourTime)
      setYourTime(currentYourTime)
      socket.emit('doMove', gameId, { from: move.from, to: move.to }, currentYourTime)
      return true

    }
    return false;
  }

  function handlePromotion(p) {
    const move = promote(p)
    if (move) {
      yourTimer.stop()
      setYourLastMoveTime(yourTime)
      socket.emit('doMove', gameId, { from: move.from, to: move.to, promotion: move.promotion }, yourTime)
    }

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

  function timeFormated(you) {
    let time = 0
    you ? time = yourTime : time = opponentTime
    if (time < 0)
      time = 0

    return Math.floor(time / (1000 * 60)).toString().padStart(2, '0') + ":"
      + (Math.floor(time / 1000) % 60).toString().padStart(2, '0') + "."
      + Math.floor(time % 1000 / 100)
  }

  function gameOver(result) {
    yourTimer.stop()
    opponentTimer.stop()
    setArePiecesDraggable(false)
    setShowResult(result)
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
          <>
            <p className='fs-1 text-white'>{timeFormated(false)}</p>
            <p className='fs-1 text-white'>{timeFormated(true)}</p>
          </>
        </Col>
      </Row>

    </Container >
  )
}
