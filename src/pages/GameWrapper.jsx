import React from 'react'
import { useParams } from 'react-router-dom'
import { Game } from './Game'

export function GameWrapper() {
  const gameId = useParams().id
  return (
    <Game key={gameId} /> //necessari perque es faci unmount al canviar entre games
  )
}
