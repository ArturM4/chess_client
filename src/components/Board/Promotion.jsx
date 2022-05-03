import React from 'react'
import { Button } from 'react-bootstrap'

export default function Promotion({ isPromoting, getPromotionRow, turn, handlePromotion }) {
  return (
    <>
      {isPromoting() && turn === 'w' && <div className='promotionPrompt' style={{ left: getPromotionRow() * 12.5 + '%' }}>
        <Button onClick={() => handlePromotion('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        <Button onClick={() => handlePromotion('n')} style={{ height: '25%', width: '100%' }}>Caball</Button>
        <Button onClick={() => handlePromotion('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
        <Button onClick={() => handlePromotion('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
      </div>}
      {
        isPromoting() && turn !== 'w' && <div className='promotionPrompt' style={{ top: '50%', left: getPromotionRow() * 12.5 + '%' }}>
          <Button onClick={() => handlePromotion('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
          <Button onClick={() => handlePromotion('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
          <Button onClick={() => handlePromotion('n')} style={{ height: '25%', width: '100%' }}>Caball</Button>
          <Button onClick={() => handlePromotion('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        </div>
      }
    </>
  )
}
