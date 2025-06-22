const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = ['sawtooth', 'triangle'][Math.floor(Math.random() * 2)];
  oscillator.frequency.setValueAtTime(700 + Math.random() * 150, audioContext.currentTime);
  const now = audioContext.currentTime;
  const rampValue = 0.001 + Math.random() * 0.002;
  const rampEnd = now + 0.0007 + Math.random() * 0.002;
  const gainValue = 0.45 - Math.random() * 0.1;
  gainNode.gain.setValueAtTime(gainValue, now);
  gainNode.gain.exponentialRampToValueAtTime(rampValue, rampEnd);
  oscillator.start(now);
  oscillator.stop(now + 0.005 * Math.random());
}

function fader(element) {
  if (element.style.opacity < 0.005) {
    return element.remove();
  }
  const currentOpacity = element.style.opacity;
  element.style.opacity = currentOpacity ** 2;
  element.style.fontSize = `${14 * currentOpacity}px`;
  window.setTimeout(() => fader(element), 150)
}

async function typeLine(array) {
  const oldLine = document.querySelector('#new-line');
  if (oldLine) {
    oldLine.id = 'old-line';
    fader(oldLine);
  }
  const element = document.createElement('p');
  element.id = 'new-line';
  element.style.opacity = 0.99;
  element.style.fontSize = '14px';
  document.body.appendChild(element);
  for (const string of array) {
    for (let index = 0; index < string.length; index++) {
      element.innerText += string[index];
      if (Math.random() > 0.4) playClickSound();
      const ms = Math.random() * 80;
      await new Promise(resolve => setTimeout(resolve, ms));
    }
    
      await new Promise(resolve => setTimeout(resolve, 60 * Math.random()));
  }
}

async function typeMessage(lineArray) {
  for (const line of lineArray) {
    await typeLine(line);
    await new Promise(resolve => setTimeout(resolve, 950));
  }
  const element = document.createElement('p');
  element.innerText = 'Please find a real engineer after visting!'
  document.body.appendChild(element);
  await new Promise(resolve => setTimeout(resolve, 2550));
  location.href = 'https://chuckterry.me';
}

const message = [
  ['Wel', 'come', ' '],
  ['You', "'re ", 'probab', 'ly ', 'he', 're ', 'becau', 'se ', 'you', "'ve ", 'got ', 'a big ', 'prob', 'lem', ' on you', "'re", ' hand', 's.'],
  ['But y', 'ou ', 'just ', 'can', "'t ", 'find ', 'the', ' right', ' person to sol', 've it', '.'],
  ['Sa', 'dly, ', "I'", 'm no', ' engine', 'er.'],
  ['But if', ' close e', 'nough,', ' is good', ' enou', 'gh.'],
  ['You', ' can ', 'ch', 'eck out ', 'my page', '.'],
  ['Loading...']
].map(line => line.map(string => string.replaceAll(' ', '\u2002')));

window.addEventListener('load', () => {
  typeMessage(message);
});
