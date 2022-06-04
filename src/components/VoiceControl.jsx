import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function VoiceControl({ doMove }) {

  const commands = [
    {
      command: ["*"],
      callback: (phrase) => {
        if (phrase === '')
          return;

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

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
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
  /*     var numbers = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8
      } */


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>{transcript}</p>
    </div>
  );
}
