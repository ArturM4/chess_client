import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { usePromotion } from '../../hooks/usePromotion';
import { useResponsiveBoard } from '../../hooks/useResponsiveBoard';
import "./Board.css"
import Promotion from './Promotion';

export function Board() {

  const [game, setGame] = useState(new Chess());
  const { checkPromotion, promote, isPromoting, getPromotionRow, cancelPromotion } = usePromotion(game, setGame)
  const { boardWidth } = useResponsiveBoard()

  function onPieceDrop(from, to) {

    const gameCopy = { ...game };

    if (checkPromotion(from, to) === true) {
      return false
    }


    const move = gameCopy.move({
      from,
      to,
      promotion: 'q'
    });
    setGame(gameCopy);

    return move;
  }

  return (
    <div className='boardWrapper'>
      <Promotion isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} handlePromotion={promote} />
      <Chessboard
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onPieceDrop}
        onSquareClick={() => cancelPromotion()}
        onPieceDragBegin={() => cancelPromotion()}
      />
    </div>
  );
}
