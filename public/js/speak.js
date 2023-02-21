const MAX_UTTERANCE_LENGTH = 200; // Set maximum utterance length as desired

function Speak(text, callback) {
  if (text.length <= MAX_UTTERANCE_LENGTH) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = callback;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    const chunks = chunkText(text, MAX_UTTERANCE_LENGTH);
    speakChunks(chunks, callback);
  }
}

function speakChunks(chunks, callback) {
  if (chunks.length === 0) {
    callback();
    return;
  }

  const chunk = chunks.shift();
  const utterance = new SpeechSynthesisUtterance(chunk);
  utterance.onend = () => speakChunks(chunks, callback);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function chunkText(text) {
    const regex = /[.?!]/;
    const chunks = [];
    let startIndex = 0;
    let endIndex = 0;
    while (endIndex < text.length) {
      endIndex = text.substring(startIndex).search(regex);
      if (endIndex === -1) {
        endIndex = text.length;
      } else {
        endIndex += startIndex;
      }
      chunks.push(text.substring(startIndex, endIndex + 1));
      startIndex = endIndex + 1;
    }
    return chunks;
  }
  