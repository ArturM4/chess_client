import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { usePromotion } from '../../hooks/usePromotion';
import { useResponsiveBoard } from '../../hooks/useResponsiveBoard';
import "./Board.css"
import Promotion from './Promotion';

export function Board() {

  const [game, setGame] = useState(new Chess());
  const { checkPromotion, promote, isPromoting, getPromotionRow } = usePromotion(game, setGame)
  const { boardWidth } = useResponsiveBoard()

  function onPieceDrop(from, to) {

    if (checkPromotion(from, to) === true)
      return false

    const gameCopy = { ...game };
    const move = gameCopy.move({
      from,
      to
    });
    setGame(gameCopy);

    return move;
  }

  return (
    <div className='boardWrapper'>
      <Promotion promote={promote} isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} />
      <Chessboard
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
}
