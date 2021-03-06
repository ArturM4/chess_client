import { Chess } from 'chess.js';
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import { useResponsiveBoard } from '../hooks/useResponsiveBoard';
import { getPieceFromPosition, isPieceWhite } from '../utils/chessUtils';
import { VoiceControl } from '../components/VoiceControl';
import GameResult from '../components/GameResult';
import { Promotion } from '../components/Promotion';
import { usePromotion } from '../hooks/usePromotion';
import { useTranslation } from 'react-i18next';
import { useCustomBoard } from '../hooks/useCustomBoard';
import { speak } from '../utils/speak';

const chessEngineWorker = new Worker(new URL('../chessEngine/chessEngineWorker', import.meta.url));

export function ComputerGame({ user, voiceControl, setVoiceControl }) {
  const [game, setGame] = useState(new Chess());

  const [isPlayerWhite] = useState(true);
  const { boardWidth } = useResponsiveBoard()
  const [showBoard, setshowBoard] = useState(false);
  const [kingInCheckSquare, setKingInCheckSquare] = useState({});
  const [showResult, setShowResult] = useState('');
  const [arePiecesDraggable, setArePiecesDraggable] = useState(true);
  const [level] = useState(2);

  const { t } = useTranslation()
  const { customPieces, customDarkSquareStyle, customLightSquareStyle } = useCustomBoard(user?.info?.config?.pieces, user?.info?.config?.board)


  const gameOver = useCallback((result) => {
    setShowResult(result)
    setArePiecesDraggable(false)

  }, [])

  function restartGame() {
    setShowResult('')
    setArePiecesDraggable(true)
    setKingInCheckSquare({})
    setGame(new Chess())
    checkPromotion()
  }

  const doMove = useCallback((from, to, promotion) => {
    const gameCopy = { ...game };
    const move = gameCopy.move({ from, to, promotion });
    if (move) {
      if (voiceControl)
        speak(`${from} ${to}`)
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
  }, [game, gameOver, isPlayerWhite, voiceControl])

  const { checkPromotion, promote, isPromoting, getPromotionRow, cancelPromotion } = usePromotion(game, setKingInCheckSquare, doMove)


  useEffect(() => {
    setshowBoard(true)
    chessEngineWorker.onmessage = function (e) {
      const from = Object.keys(e.data)[0]
      const to = e.data[from]
      if (voiceControl)
        setTimeout(() => {
          doMove(from.toLowerCase(), to.toLowerCase(), 'q')
        }, 350)
      else
        doMove(from.toLowerCase(), to.toLowerCase(), 'q')

    };
  }, [doMove, voiceControl])


  function onPieceDrop(from, to) {
    if (checkPromotion(from, to) === true) {
      return false
    }
    const move = doMove(from, to)

    if (move) {
      if (move.gameOver !== true)
        chessEngineWorker.postMessage({ fen: game.fen(), lvl: level });
      return true;
    }
    return false
  }

  function handlePromotion(p) {

    const move = promote(p)
    if (move) {
      if (move.gameOver !== true)
        chessEngineWorker.postMessage({ fen: game.fen(), lvl: level });
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
            <VoiceControl doMove={onPieceDrop} yourTurn={game.turn() === 'w' === isPlayerWhite} voiceControl={voiceControl} setVoiceControl={setVoiceControl} />
            <Button className='mt-4' onClick={restartGame}>{t('ComputerGame.newGame')}</Button>
          </>}
        </Col>
      </Row>

    </Container >
  )
}
