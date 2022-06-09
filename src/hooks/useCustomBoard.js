
export function useCustomBoard() {
  const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'];
  const customPieces = () => {
    const returnPieces = {};
    pieces.forEach((p) => {
      returnPieces[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: 'url(' + require('../assets/basic1/' + p + '.png') + ')',
            backgroundSize: '100%',
          }}
        />
      );
    });
    return returnPieces;
  };

  return {
    customPieces
  }

}
