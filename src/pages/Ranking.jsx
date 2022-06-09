import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { getAllUsersSorted } from '../services/users';

export function Ranking({ user }) {
  const [players, setPlayeres] = useState([])


  useEffect(() => {
    getAllUsersSorted().then((result) => {
      setPlayeres(result)
    })
  }, [])

  function renderRanking() {
    let ret = [<ListGroup.Item key={'king'} className='text-center fw-bold' style={{ backgroundColor: '#bf9000', color: '#000' }}>King</ListGroup.Item>]
    let lastPlayerElo = 100000000;
    players.forEach((player, i) => {
      if (lastPlayerElo > 1000 && player.elo <= 1000)
        ret.push(<ListGroup.Item key={'queen'} className='text-center fw-bold' style={{ backgroundColor: '#c0c0c0', color: '#000' }}>Queen</ListGroup.Item>)
      if (lastPlayerElo > 800 && player.elo <= 800)
        ret.push(<ListGroup.Item key={'rook'} className='text-center fw-bold' style={{ backgroundColor: '#cd7f32', color: '#000' }}>Rook</ListGroup.Item>)
      if (lastPlayerElo > 600 && player.elo <= 600)
        ret.push(<ListGroup.Item key={'knight'} className='text-center fw-bold' style={{ backgroundColor: '#3d85c6', color: '#000' }}>Knight</ListGroup.Item>)
      if (lastPlayerElo > 400 && player.elo <= 400)
        ret.push(<ListGroup.Item key={'bishop'} className='text-center fw-bold' style={{ backgroundColor: '#674ea7', color: '#000' }}>Bishop</ListGroup.Item>)
      if (lastPlayerElo > 200 && player.elo <= 200)
        ret.push(<ListGroup.Item key={'pawn'} className='text-center fw-bold' style={{ backgroundColor: '#6aa84f', color: '#000' }}>Pawn</ListGroup.Item>)

      ret.push(<ListGroup.Item key={i} className='dark'>{player.username}<span className='float-end me-3'>{player.elo}</span></ListGroup.Item>)
      lastPlayerElo = player.elo
    })

    return ret
  }

  return (
    <div className='mt-5 px-3 mediumContainer'>

      <ListGroup>
        <ListGroup.Item style={{ backgroundColor: '#0b0b0c', color: '#fff' }}>Ranking<span className='float-end me-2'>Elo</span></ListGroup.Item>
        {renderRanking()}
      </ListGroup>

    </div>
  )
}


