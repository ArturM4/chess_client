import { status, aiMove } from 'js-chess-engine'

onmessage = function (e) {
  const { fen, lvl } = e.data
  const move = aiMove(status(fen), lvl)
  postMessage(move);
};
