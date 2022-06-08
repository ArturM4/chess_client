import React from 'react'
import { useParams } from 'react-router-dom'
import { Game } from './Game'

export function GameWrapper({ voiceControl, setVoiceControl, user }) {
  const gameId = useParams().id
  return (
    <Game key={gameId} user={user} voiceControl={voiceControl} setVoiceControl={setVoiceControl} /> //key necessari perque es faci unmount al canviar entre games
  )
}
