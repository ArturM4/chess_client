import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { usePromotion } from '../../hooks/usePromotion';
import "./Board.css"
import Promotion from './Promotion';

export function Board() {

  //estat per controlar la mida del taulell
  const [boardWidth, setBoardWidth] = useState();

  const [game, setGame] = useState(new Chess());
  const { checkPromotion, promote, isPromoting, getPromotionRow } = usePromotion(game, setGame)

  useEffect(() => {
    function handleResize() {
      //obté la mida del div que envolta la taula i canvia la mida de la taula per adaptar-se
      const boardWrapper = document.getElementsByClassName('boardWrapper')[0];
      setBoardWidth(boardWrapper.offsetWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
