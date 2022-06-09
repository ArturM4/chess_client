
export function useCustomBoard(set, board) {
  const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'];
  const customPieces = () => {
    if (set === '' || set === undefined)
      return;
    const returnPieces = {};
    pieces.forEach((p) => {
      returnPieces[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: 'url(' + require('../assets/' + set + '/' + p + '.png') + ')',
            backgroundSize: '100%',
          }}
        />
      );
    });
    return returnPieces;
  };

  const customDarkSquareStyle = () => {
    if (board === '' || board === undefined)
      return;
    if (board === 'classic')
      return { backgroundColor: '#979797' }
  }

  const customLightSquareStyle = () => {
    if (board === '' || board === undefined)
      return;
    if (board === 'classic')
      return { backgroundColor: '#fff' }
  }

  return {
    customPieces,
    customDarkSquareStyle,
    customLightSquareStyle
  }

}
