import { useState } from "react";
import { getRow } from "../utils/chessUtils";

export function usePromotion(game, setKingInCheckSquare, doMove) {
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
    } else {
      setPromotionMove({})

    }
    return false
  }

  function promote(promotionPiece) {
    let { from, to } = promotionMove

    let move = doMove(from, to, promotionPiece)

    if (move) {
      setPromotionMove({})
    }

    return move;
  }

  function cancelPromotion() {
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
    getPromotionRow,
    cancelPromotion
  }

}

