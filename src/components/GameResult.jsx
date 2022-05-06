import React from 'react'
import { Alert } from 'react-bootstrap'

export default function GameResult({ showResult, setShowResult }) {
  return (
    <>
      {showResult === 'win' && < Alert className='resultContainer m-4' variant="success" onClose={() => setShowResult('')} dismissible>
        <Alert.Heading>Victòria!</Alert.Heading>
        <p>Enhorabona, has guanyat!</p>
      </Alert>}

      {showResult === 'loss' && <Alert className='resultContainer m-4' variant="danger" onClose={() => setShowResult('')} dismissible>
        <Alert.Heading>Derrota...</Alert.Heading>
        <p>Has perdut!</p>
      </Alert>}

      {showResult === 'draw' && <Alert className='resultContainer m-4' variant="secondary" onClose={() => setShowResult('')} dismissible>
        <Alert.Heading>Empat</Alert.Heading>
        <p>La partida ha acabat en empat</p>
      </Alert>}
    </>
  )
}
