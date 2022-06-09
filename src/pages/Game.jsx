import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useParams } from 'react-router-dom';
import { usePromotion } from '../hooks/usePromotion';
import { useResponsiveBoard } from '../hooks/useResponsiveBoard';
import socket from '../socket/socket'
import { getPieceFromPosition, getTimeFromMode, isPieceWhite } from '../utils/chessUtils';
import { Promotion } from '../components/Promotion';
import GameResult from '../components/GameResult';
import { useClock } from '../hooks/useClock';
import { VoiceControl } from '../components/VoiceControl';
import { useCustomBoard } from '../hooks/useCustomBoard';

export function Game({ user, voiceControl, setVoiceControl }) {
  const gameId = useParams().id

  const [isPlayerWhite, setIsPlayerWhite] = useState(true);
  const [game, setGame] = useState(new Chess());
  const [showResult, setShowResult] = useState('');
  const [arePiecesDraggable, setArePiecesDraggable] = useState(true);
  const [kingInCheckSquare, setKingInCheckSquare] = useState({});
  const { boardWidth } = useResponsiveBoard()
  const [showBoard, setshowBoard] = useState(false);

  const gameOver = useCallback((result) => {
    setArePiecesDraggable(false)
    setShowResult(result)
    if (user)
      socket.emit('gameEnded', gameId, result, user.info.id)
  }, [gameId, user])

  const { yourTimer, opponentTimer, yourTime, opponentTime, getYourCurrentTime, setTime, stopAllTimers } = useClock(gameOver)
  const { customPieces, customDarkSquareStyle, customLightSquareStyle } = useCustomBoard(user?.info?.config?.pieces, user?.info?.config?.board)


  const doMove = useCallback((from, to, promotion) => {
    const gameCopy = { ...game };
    const move = gameCopy.move({ from, to, promotion });
    if (move) {
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
        stopAllTimers()
        move.gameOver = true
        if (gameCopy.in_checkmate()) {
          if (gameCopy.turn() === 'w' === isPlayerWhite)
            gameOver('loss')
          else
            gameOver('win')
        }

        if (gameCopy.in_draw())
          gameOver('draw')

      }
    }
    return move;
  }, [game, isPlayerWhite, gameOver, stopAllTimers])

  const { checkPromotion, promote, isPromoting, getPromotionRow, cancelPromotion } = usePromotion(game, setKingInCheckSquare, doMove)

  useEffect(() => {
    socket.emit('joinGame', gameId)
  }, [gameId]);

  useEffect(() => {

    socket.on("gameInit", (isWhite, mode) => {
      setIsPlayerWhite(isWhite)
      setshowBoard(true)
      setTime(getTimeFromMode(mode))

      if (isWhite)
        yourTimer.start()
      else
        opponentTimer.start()
    })

    return () => {
      socket.off('gameInit')
    }
  }, [isPlayerWhite, yourTimer, opponentTimer, setTime]);

  useEffect(() => {
    socket.on("moveDone", ({ from, to, promotion }, oppTime) => {
      opponentTimer.stop(oppTime)
      yourTimer.start()
      let move = doMove(from, to, promotion)
      if (!move.gameOver)
        socket.emit('receivedMove', gameId)
    })
    return () => {
      socket.off('moveDone')
    }
  }, [gameId, doMove, yourTimer, opponentTimer]);


  useEffect(() => {
    socket.on("oppponentReceivedMove", () => {
      opponentTimer.start()
    })

    return () => {
      socket.off('oppponentReceivedMove')
    }
  }, [opponentTimer]);

  function onPieceDrop(from, to) {
    let currentYourTime = getYourCurrentTime()

    if (currentYourTime <= 0) {
      gameOver('loss')
      return
    }
    if (checkPromotion(from, to) === true)
      return false
    let move = doMove(from, to)
    if (move) {

      yourTimer.stop(currentYourTime)
      socket.emit('doMove', gameId, { from: move.from, to: move.to }, currentYourTime)
      return true

    }
    return false;
  }

  function handlePromotion(p) {
    let currentYourTime = getYourCurrentTime()
    if (currentYourTime <= 0) {
      gameOver('loss')
      return
    }

    const move = promote(p)
    if (move) {
      yourTimer.stop(currentYourTime)
      socket.emit('doMove', gameId, { from: move.from, to: move.to, promotion: move.promotion }, currentYourTime)
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



  return (
    <Container className='mt-5'>
      <Row>
        <Col md={0} xl={2}>
        </Col>
        <Col xs={12} md={9} xl={8} >
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
                customDarkSquareStyle={customDarkSquareStyle()}
                customLightSquareStyle={customLightSquareStyle()}
                customPieces={customPieces()}
              />
            </>}
          </div>
        </Col>
        <Col xs={12} md={3} xl={2} className='align-self-center'>
          {showBoard && <>
            <p className='display-3 text-white'>{timeFormated(false)}</p>
            <p className='display-3 text-white'>{timeFormated(true)}</p>
            <VoiceControl doMove={onPieceDrop} yourTurn={game.turn() === 'w' === isPlayerWhite} voiceControl={voiceControl} setVoiceControl={setVoiceControl} />
          </>}
        </Col>
      </Row>

    </Container >
  )
}
