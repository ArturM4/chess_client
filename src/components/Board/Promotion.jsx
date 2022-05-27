import React from 'react'
import { Button } from 'react-bootstrap'

export default function Promotion({ isPromoting, getPromotionRow, turn, handlePromotion, orientation }) {
  return (
    <>
      {isPromoting() && turn === orientation && <div className='promotionPrompt' style={{ left: turn === 'w' ? getPromotionRow() * 12.5 + '%' : (7 - getPromotionRow()) * 12.5 + '%' }}>
        <Button onClick={() => handlePromotion('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        <Button onClick={() => handlePromotion('n')} style={{ height: '25%', width: '100%' }}>Cavall</Button>
        <Button onClick={() => handlePromotion('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
        <Button onClick={() => handlePromotion('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
      </div>}
      {
        isPromoting() && turn !== orientation && <div className='promotionPrompt' style={{ top: '50%', left: turn === 'b' ? getPromotionRow() * 12.5 + '%' : (7 - getPromotionRow()) * 12.5 + '%' }}>
          <Button onClick={() => handlePromotion('b')} style={{ height: '25%', width: '100%' }}>Alfil</Button>
          <Button onClick={() => handlePromotion('r')} style={{ height: '25%', width: '100%' }}>Torre</Button>
          <Button onClick={() => handlePromotion('n')} style={{ height: '25%', width: '100%' }}>Cavall</Button>
          <Button onClick={() => handlePromotion('q')} style={{ height: '25%', width: '100%' }}>Reina</Button>
        </div>
      }
    </>
  )
}
