import React from 'react'
import { Button } from 'react-bootstrap'

export default function Promotion({ promote, isPromoting, getPromotionRow, turn }) {
  return (
    <>
      {isPromoting() && turn === 'w' && <div className='promotionPrompt' style={{ left: getPromotionRow() * 12.5 + '%' }}>
        <Button onClick={() => promote('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        <Button onClick={() => promote('n')} style={{ height: '25%', width: '100%' }}>Caball</Button>
        <Button onClick={() => promote('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
        <Button onClick={() => promote('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
      </div>}
      {
        isPromoting() && turn !== 'w' && <div className='promotionPrompt' style={{ top: '50%', left: getPromotionRow() * 12.5 + '%' }}>
          <Button onClick={() => promote('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
          <Button onClick={() => promote('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
          <Button onClick={() => promote('n')} style={{ height: '25%', width: '100%' }}>Caball</Button>
          <Button onClick={() => promote('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        </div>
      }
    </>
  )
}
