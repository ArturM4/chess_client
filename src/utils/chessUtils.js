export function getRow(position) {
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

export function isPieceWhite(piece) {
  if (piece.charAt(0) === 'w')
    return true
  return false
}

export function getPieceFromPosition(game, piece) {
  return [].concat(...game.board()).map((p, index) => {
    if (p !== null && p.type === piece.type && p.color === piece.color) {
      return index
    }
  }).filter(Number.isInteger).map((piece_index) => {
    const row = 'abcdefgh'[piece_index % 8]
    const column = Math.ceil((64 - piece_index) / 8)
    return row + column
  })
}