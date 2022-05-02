import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Chessboard } from 'react-chessboard';
import "./Board.css"
export function Board() {

  //estat per controlar la mida del taulell
  const [boardWidth, setBoardWidth] = useState();

  const [game, setGame] = useState(new Chess());
  const [promotionMove, setPromotionMove] = useState({});

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
    const isPromotion = game.moves({ verbose: true })
      .filter((move) => move.from === from &&
        move.to === to &&
        move.flags.includes('p')).length > 0
    if (isPromotion) {
      let row = getRow(to)
      setPromotionMove({ from, to, row })
      game.turn()
      return false
    }

    const gameCopy = { ...game };
    const move = gameCopy.move({
      from,
      to,
      promotion: 'q'
    });
    setGame(gameCopy);
    return move;
  }
  function promote(promotionPiece) {
    const gameCopy = { ...game };
    let { from, to } = promotionMove

    gameCopy.move({
      from,
      to,
      promotion: promotionPiece
    });

    setGame(gameCopy);
    setPromotionMove({})
  }
  function getRow(position) {
    let row = position.charAt(0)
    switch (row) {
      case 'a': return 0
      case 'b': return 1
      case 'c': return 2
      case 'd': return 3
      case 'e': return 4
      case 'f': return 5
      case 'g': return 6
      case 'h': return 7
      default: return -1
    }
  }


  return (
    <div className='boardWrapper'>
      {Object.keys(promotionMove).length !== 0 && game.turn() === 'w' && <div className='promotionPrompt' style={{ left: promotionMove.row * 12.5 + '%' }}>
        <Button onClick={() => promote('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        <Button onClick={() => promote('n')} style={{ height: '25%', width: '100%' }}>Caball</Button>
        <Button onClick={() => promote('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
        <Button onClick={() => promote('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
      </div>}
      {Object.keys(promotionMove).length !== 0 && game.turn() !== 'w' && <div className='promotionPrompt' style={{ top: '50%', left: promotionMove.row * 12.5 + '%' }}>
        <Button onClick={() => promote('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
        <Button onClick={() => promote('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
        <Button onClick={() => promote('n')} style={{ height: '25%', width: '100%' }}>Caball</Button>
        <Button onClick={() => promote('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
      </div>}
      <Chessboard
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
}
