import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import "./Board.css"
export function Board() {

  //estat per controlar la mida del taulell
  const [boardWidth, setBoardWidth] = useState();

  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    function handleResize() {
      //obté la mida del div que envolta la taula i canvia la mida de la taula per adaptar-se
      const boardWrapper = document.getElementsByClassName('boardWrapper')[0];
      setBoardWidth(boardWrapper.offsetWidth - 25);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onPieceDrop(from, to) {
    const gameCopy = { ...game };
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
      <Chessboard
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
}
