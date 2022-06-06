import React from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

export default function GameResult({ showResult, setShowResult }) {
  const { t } = useTranslation();

  return (
    <>
      {showResult === 'win' && < Alert className='resultContainer m-4' variant="success" onClose={() => setShowResult('')} dismissible>
        <Alert.Heading>{t("GameResult.victory")}</Alert.Heading>
      </Alert>}

      {showResult === 'loss' && <Alert className='resultContainer m-4' variant="danger" onClose={() => setShowResult('')} dismissible>
        <Alert.Heading>{t("GameResult.defeat")}</Alert.Heading>
      </Alert>}

      {showResult === 'draw' && <Alert className='resultContainer m-4' variant="secondary" onClose={() => setShowResult('')} dismissible>
        <Alert.Heading>{t("GameResult.draw")}</Alert.Heading>
      </Alert>}
    </>
  )
}
