import React from 'react'
import { Image } from 'react-bootstrap'

export function Promotion({ isPromoting, getPromotionRow, turn, handlePromotion, orientation, pieces }) {
  if (pieces === undefined)
    pieces = 'standard'
  return (
    <>
      {isPromoting() && turn === orientation && <div className='promotionPrompt' style={{ left: turn === 'w' ? getPromotionRow() * 12.5 + '%' : (7 - getPromotionRow()) * 12.5 + '%' }}>
        <Image onClick={() => handlePromotion('q')} src={require('../assets/' + pieces + '/wQ.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
        <Image onClick={() => handlePromotion('n')} src={require('../assets/' + pieces + '/wN.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
        <Image onClick={() => handlePromotion('r')} src={require('../assets/' + pieces + '/wR.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
        <Image onClick={() => handlePromotion('b')} src={require('../assets/' + pieces + '/wB.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
      </div>}
      {
        isPromoting() && turn !== orientation && <div className='promotionPrompt' style={{ top: '50%', left: turn === 'b' ? getPromotionRow() * 12.5 + '%' : (7 - getPromotionRow()) * 12.5 + '%' }}>
          <Image onClick={() => handlePromotion('b')} src={require('../assets/' + pieces + '/bB.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
          <Image onClick={() => handlePromotion('r')} src={require('../assets/' + pieces + '/bR.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
          <Image onClick={() => handlePromotion('n')} src={require('../assets/' + pieces + '/bN.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />
          <Image onClick={() => handlePromotion('q')} src={require('../assets/' + pieces + '/bQ.png')} style={{ height: '25%', width: '100%', backgroundColor: '#96c6f2' }} />

        </div>
      }
    </>
  )
}
