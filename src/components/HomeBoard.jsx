import { Chessboard } from 'react-chessboard';
import { usePromotion } from '../hooks/usePromotion';
import { useResponsiveBoard } from '../hooks/useResponsiveBoard';
import { Promotion } from './Promotion';

export function HomeBoard({ props }) {

  const { game, doMove, setKingInCheckSquare, kingInCheckSquare } = props
  const { boardWidth } = useResponsiveBoard()



  const { checkPromotion, promote, isPromoting, getPromotionRow, cancelPromotion } = usePromotion(game, setKingInCheckSquare, doMove)

  function onPieceDrop(from, to) {
    if (checkPromotion(from, to) === true) {
      return false
    }
    const move = doMove(from, to)

    return move;
  }


  return (
    <>
      <div className='boardWrapper'>

        <Promotion isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} handlePromotion={promote} orientation={'w'} />
        <Chessboard
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          onSquareClick={() => cancelPromotion()}
          onPieceDragBegin={() => cancelPromotion()}
          customSquareStyles={{ ...kingInCheckSquare }}
        />
      </div>

    </>
  );
}
