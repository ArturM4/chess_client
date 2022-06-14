export function speak(txt) {
  var speech = new SpeechSynthesisUtterance();
  speech.text = txt
  speech.volume = 1;
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}