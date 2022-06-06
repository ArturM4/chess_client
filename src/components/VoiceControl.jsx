
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function VoiceControl({ doMove, yourTurn, voiceControl, setVoiceControl }) {

  const [lastVoiceMSG, setLastVoiceMSG] = useState('')
  const [showVCModal, setShowVCModal] = useState(false)

  const commands = [
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
          console.log('2 o 3', arr)

        }
        if (arr.length === 4) {

          console.log('4', arr)
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
    if (voiceControl && yourTurn)
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })
    else
      SpeechRecognition.stopListening()
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
            label="Activar control de veu"
            onChange={({ target }) => {
              if (target.checked)
                setVoiceControl(true)
              else
                setVoiceControl(false)
            }}
            checked={voiceControl}
          />
        </Form>
        <Button onClick={() => setShowVCModal(true)} variant='secondary' size='sm' className='my-2'>Com funciona</Button>
        {voiceControl && <>
          <p>Micròfon: {listening ? 'Escoltant' : 'Apagat'}</p>
          <p>{lastVoiceMSG}</p>
        </>}

      </div>

      <Modal show={showVCModal} onHide={() => setShowVCModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Funcionament del control per veu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El control per veu serveix per poder dictar els moviments a fer mitjançant la veu.<br />
          Actualment només està disponible en castellà.<br />
          Per realitzar un moviment s'ha de dir la casella inicial de la peça i la casella final (b1 c3).<br />
          Per millorar el reconeixement es recomanable utilitzar paraules enlloc de lletres (Barco 1 Casa 3).<br />
          Exemples de paraules per cada lletra:<br />
          A - Alpha<br />
          B - Bravo, Barco<br />
          C - Casa, Coche<br />
          D - Día<br />
          E - Eco<br />
          F - Faro<br />
          G - Gorro, Golf<br />
          H - Hotel<br />
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