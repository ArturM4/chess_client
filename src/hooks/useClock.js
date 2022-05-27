import { useRef, useState } from "react";
import { useInterval } from "./useInterval";

export function useClock(gameOver) {

  const [yourLastMoveTime, setYourLastMoveTime] = useState(0);
  const [opponentLastMoveTime, setOpponentLastMoveTime] = useState(0);
  const [yourTime, setYourTime] = useState(0);
  const [opponentTime, setOpponentTime] = useState(0);
  const lastMoveDate = useRef();

  const yourInterval = useInterval(() => {
    let time = yourLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    if (time <= 0) {
      gameOver('loss')
      stopAllTimers()
    }


    setYourTime(time)
  }, 25);

  const opponentInterval = useInterval(() => {
    let time = opponentLastMoveTime - ((new Date()).getTime() - lastMoveDate.current.getTime())
    if (time <= -1000) {
      gameOver('win')
      stopAllTimers()
    }


    setOpponentTime(time)
  }, 25);

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

  function setTime(timeToSet) {
    setYourLastMoveTime(timeToSet)
    setYourTime(timeToSet)
    setOpponentLastMoveTime(timeToSet)
    setOpponentTime(timeToSet)
  }

  return {
    yourTimer,
    opponentTimer,
    yourTime,
    opponentTime,
    getYourCurrentTime,
    setTime,
    stopAllTimers
  }

}

