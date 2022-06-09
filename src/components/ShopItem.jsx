import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { purchaseItem } from '../services/users'

export function ShopItem({ name, isPiece, setItem, user, setUser }) {
  const { t } = useTranslation();

  if (name === undefined)
    return

  const handleTry = () => {
    setItem(name)
  }

  const equip = () => {
    setItem(name)
    if (user) {
      if (isPiece)
        setUser((prev) => {
          prev.info.config.pieces = name
          return prev
        })
      else
        setUser((prev) => {
          prev.info.config.board = name
          return prev
        })
    }

  }

  const purchase = async () => {
    try {
      const userUpdated = await purchaseItem(user.info.id, name)
      setUser((prev) => {
        return { ...prev, info: userUpdated }
      })
    } catch (error) {
      console.log(error)
      if (error?.response?.data?.error === 'insufficient coins')
        alert(t("Shop.noCoins"))
      else
        alert(t("Login.errors.GeneralError"))
    }
  }

  return (
    <Card className='mb-3'>
      <Card.Img variant="top" src={require('../assets/' + name + (isPiece ? '/sampleR.png' : '.png'))} />
      <Card.Body>
        {name === 'standard' || user?.info?.itemsPurchased.includes(name)
          ? <Button onClick={equip} size='sm' className='mb-2' variant="success">{t("Shop.equip")}</Button>
          : <>
            <Card.Title>100💰</Card.Title>
            {user && <Button onClick={purchase} size='sm' className='mb-sm-2' variant="warning">{t("Shop.buy")}</Button>}

            <Button size='sm' onClick={handleTry} variant="secondary">{t("Shop.try")}</Button>
          </>
        }

      </Card.Body>
    </Card>
  )
}
