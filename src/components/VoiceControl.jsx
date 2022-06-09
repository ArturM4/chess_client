
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function VoiceControl({ doMove, yourTurn, voiceControl, setVoiceControl, searchNewGame, searchingGame }) {

  const [lastVoiceMSG, setLastVoiceMSG] = useState('')
  const [showVCModal, setShowVCModal] = useState(false)
  const { t } = useTranslation();

  const commands = [
    {
      command: ["Nueva partida"],
      callback: (phrase) => {
        if (!searchingGame)
          searchNewGame()
      }
    },
    {
      command: ["*"],
      callback: (phrase) => {
        if (phrase === '')
          return;

        setLastVoiceMSG(phrase)
        console.log(phrase)
        let arr = phrase.toLowerCase().split(' ')
        if (arr.length === 2 || arr.length === 3) {
          arr = divideNumbers(arr)

        }
        if (arr.length === 4) {

          if (isNaN(arr[1]))
            if (numbersInSpanish[arr[1]])
              arr[1] = numbersInSpanish[arr[1]]
          if (isNaN(arr[3]))
            if (numbersInSpanish[arr[3]])
              arr[3] = numbersInSpanish[arr[3]]
          console.log(arr[0].toLowerCase().charAt(0) + arr[1] + ' -- ' + arr[2].toLowerCase().charAt(0) + arr[3])
          doMove(arr[0].toLowerCase().charAt(0) + arr[1], arr[2].toLowerCase().charAt(0) + arr[3])
        }
      }
    },
  ];

  const {
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (voiceControl && yourTurn) {
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })
    }
    else {
      SpeechRecognition.stopListening()
    }
  }, [voiceControl, yourTurn])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <div className='text-white'>

        <Form>
          <Form.Check
            type="switch"
            label={t("VoiceControl.activate")}
            onChange={({ target }) => {
              if (target.checked)
                setVoiceControl(true)
              else
                setVoiceControl(false)
            }}
            checked={voiceControl}
          />
        </Form>
        <Button onClick={() => setShowVCModal(true)} variant='secondary' size='sm' className='my-2'>{t("VoiceControl.information")}</Button>
        {voiceControl && <>
          <p>{t("VoiceControl.microphone")}: {listening ? t("VoiceControl.listening") : t("VoiceControl.muted")}</p>
          <p>{lastVoiceMSG}</p>
        </>}

      </div>

      <Modal show={showVCModal} onHide={() => setShowVCModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t("VoiceControl.explanationTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("VoiceControl.explanation.1")}<br />
          {t("VoiceControl.explanation.2")}<br />
          {t("VoiceControl.explanation.3")}<br />
          {t("VoiceControl.explanation.4")}<br />
          {t("VoiceControl.explanation.5")}<br />
          {t("VoiceControl.explanation.6")}<br />
          {t("VoiceControl.explanation.7")}<br />
          {t("VoiceControl.explanation.8")}<br />
          {t("VoiceControl.explanation.9")}<br />
          {t("VoiceControl.explanation.10")}<br />
          {t("VoiceControl.explanation.11")}<br />
          {t("VoiceControl.explanation.12")}<br />
          {t("VoiceControl.explanation.13")}<br />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const numbersInSpanish = {
  'uno': 1,
  'dos': 2,
  'tres': 3,
  'cuatro': 4,
  'cinco': 5,
  'seis': 6,
  'siete': 7,
  'ocho': 8
}

function divideNumbers(arrayPhrase) {
  let newArray = []
  arrayPhrase.forEach(word => {
    if (isNaN(word) && !isNaN(word.charAt(word.length - 1))) {
      newArray.push(word.slice(0, word.length - 1))
      newArray.push(word.slice(word.length - 1, word.length))

    } else
      newArray.push(word)
  });
  return newArray
}