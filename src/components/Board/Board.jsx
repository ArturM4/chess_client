import { Chess } from 'chess.js';
import { useCallback, useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { usePromotion } from '../../hooks/usePromotion';
import { useResponsiveBoard } from '../../hooks/useResponsiveBoard';
import { getPieceFromPosition } from '../../utils/chessUtils';
import { VoiceControl } from '../VoiceControl';
import "./Board.css"
import Promotion from './Promotion';

export function Board() {

  const [game, setGame] = useState(new Chess());
  const [kingInCheckSquare, setKingInCheckSquare] = useState({});

  const { boardWidth } = useResponsiveBoard()

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


    }
    return move;
  }, [game])

  const { checkPromotion, promote, isPromoting, getPromotionRow, cancelPromotion } = usePromotion(game, setKingInCheckSquare, doMove)

  function onPieceDrop(from, to) {
    if (checkPromotion(from, to) === true) {
      return false
    }
    const move = doMove(from, to)

    return move;
  }


  return (
    <>
      <div className='boardWrapper'>

        <Promotion isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} handlePromotion={promote} orientation={'w'} />
        <Chessboard
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          onSquareClick={() => cancelPromotion()}
          onPieceDragBegin={() => cancelPromotion()}
          customSquareStyles={{ ...kingInCheckSquare }}
        />
      </div>
      <VoiceControl doMove={doMove} />
    </>
  );
}
