import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import "./Board.css"
export function Board() {

  //estat per controlar la mida del taulell
  const [boardWidth, setBoardWidth] = useState();

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

  return (
    <div className='boardWrapper'>
      <Chessboard boardWidth={boardWidth} />
    </div>
  );
}
