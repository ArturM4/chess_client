import React from 'react'
import { Button, Card } from 'react-bootstrap'

export function ShopItem({ name, price, isPiece, setItem, user }) {
  if (name === undefined)
    return

  const handleTry = () => {
    setItem(name)
  }
  return (
    <Card className='mb-3'>
      <Card.Img variant="top" src={require('../assets/' + name + (isPiece ? '/bP.png' : '.png'))} />
      <Card.Body>
        {name === 'standard'
          ? <Button size='sm' className='mb-2' variant="success">Equipar</Button>
          : <>
            <Card.Title>{price}💰</Card.Title>
            {user && <Button size='sm' className='mb-2' variant="warning">Comprar</Button>}
            <Button size='sm' onClick={handleTry} variant="secondary">Provar</Button>
          </>
        }

      </Card.Body>
    </Card>
  )
}
