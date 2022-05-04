import { useState } from "react";
import { getPieceFromPosition, getRow } from "../utils/chessUtils";

export function usePromotion(game, setGame, setKingInCheckSquare) {
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


    const move = gameCopy.move({
      from,
      to,
      promotion: promotionPiece
    });

    if (move) {
      setGame(gameCopy);
      setPromotionMove({})

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

