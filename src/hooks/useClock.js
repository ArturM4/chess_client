import { useRef, useState } from "react";
import { useInterval } from "./useInterval";

export function useClock(initialTime, gameOver) {

  const [yourLastMoveTime, setYourLastMoveTime] = useState(initialTime);
  const [opponentLastMoveTime, setOpponentLastMoveTime] = useState(initialTime);
  const [yourTime, setYourTime] = useState(initialTime);
  const [opponentTime, setOpponentTime] = useState(initialTime);
  const lastMoveDate = useRef();

  const yourInterval = useInterval(() => {
    let time = yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    if (time <= 0)
      gameOver('loss')

    setYourTime(time)
  }, 100);

  const opponentInterval = useInterval(() => {
    let time = opponentLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    if (time <= -1000)
      gameOver('win')

    setOpponentTime(time)
  }, 100);

  const yourTimer = {
    start: () => {
      lastMoveDate.current = new Date()
      yourInterval.start()
    },
    stop: (timeToSet) => {
      yourInterval.stop()
      setYourLastMoveTime(timeToSet)
      setYourTime(timeToSet)
    }
  }

  const opponentTimer = {
    start: () => {
      lastMoveDate.current = new Date()
      opponentInterval.start()
    },
    stop: (timeToSet) => {
      opponentInterval.stop()
      setOpponentLastMoveTime(timeToSet)
      setOpponentTime(timeToSet)
    }
  }

  function getYourCurrentTime() {
    return yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
  }

  function stopAllTimers() {
    yourInterval.stop()
    opponentInterval.stop()
  }

  return {
    yourTimer,
    opponentTimer,
    yourTime,
    opponentTime,
    getYourCurrentTime,
    stopAllTimers
  }

}

