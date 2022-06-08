import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getAllUsersSorted } from '../services/users';

export function Ranking({ user }) {
  const [players, setPlayeres] = useState([])
  const { t } = useTranslation();


  useEffect(() => {
    getAllUsersSorted().then((result) => {
      setPlayeres(result)
    })
  }, [])


  return (
    <div className='mt-5 px-3 mediumContainer'>

      <ListGroup>
        <ListGroup.Item style={{ backgroundColor: '#0b0b0c', color: '#fff' }}>{t("Ranking.ranking")}<span className='float-end me-2'>Elo</span></ListGroup.Item>

        {players.map((player, i) => {
          return (
            <ListGroup.Item key={i} className='dark'>{player.username}<span className='float-end me-3'>{player.elo}</span></ListGroup.Item>
          )
        })}
      </ListGroup>

    </div>
  )
}


