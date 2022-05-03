import { useState } from "react";

export function usePromotion(game, setGame) {
  const [promotionMove, setPromotionMove] = useState({});

  function checkPromotion(from, to) {
    const isPromotion = game.moves({ verbose: true })
      .filter((move) => move.from === from &&
        move.to === to &&
        move.flags.includes('p')).length > 0
    if (isPromotion) {
      let row = getRow(to)
      setPromotionMove({ from, to, row })
      return true
    }
    return false
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

  function isPromoting() {
    if (Object.keys(promotionMove).length !== 0)
      return true
    return false
  }

  function getPromotionRow() {
    return promotionMove.row
  }

  return {
    checkPromotion,
    promote,
    isPromoting,
    getPromotionRow
  }

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