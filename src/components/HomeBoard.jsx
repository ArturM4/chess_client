import { Chessboard } from 'react-chessboard';
import { useCustomBoard } from '../hooks/useCustomBoard';
import { usePromotion } from '../hooks/usePromotion';
import { useResponsiveBoard } from '../hooks/useResponsiveBoard';
import { Promotion } from './Promotion';

export function HomeBoard({ props }) {

  const { game, doMove, setKingInCheckSquare, kingInCheckSquare, user } = props
  const { boardWidth } = useResponsiveBoard()

  const { customPieces, customDarkSquareStyle, customLightSquareStyle } = useCustomBoard(user?.info?.config?.pieces, user?.info?.config?.board)



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

        <Promotion isPromoting={isPromoting} getPromotionRow={getPromotionRow} turn={game.turn()} handlePromotion={promote} orientation={'w'} pieces={user?.info?.config?.pieces} />
        <Chessboard
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          onSquareClick={() => cancelPromotion()}
          onPieceDragBegin={() => cancelPromotion()}
          customSquareStyles={{ ...kingInCheckSquare }}
          customDarkSquareStyle={customDarkSquareStyle()}
          customLightSquareStyle={customLightSquareStyle()}
          customPieces={customPieces()}
        />
      </div>

    </>
  );
}
