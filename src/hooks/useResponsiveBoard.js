import { useEffect, useState } from "react";

export function useResponsiveBoard(game, setGame) {
  //estat per controlar la mida del taulell
  const [boardWidth, setBoardWidth] = useState();

  useEffect(() => {
    function handleResize() {
      //obté la mida del div que envolta la taula i canvia la mida de la taula per adaptar-se
      const boardWrapper = document.getElementsByClassName('boardWrapper')[0];
      if (typeof boardWrapper !== 'undefined')
        setBoardWidth(boardWrapper.offsetWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return {
    boardWidth
  }

}
