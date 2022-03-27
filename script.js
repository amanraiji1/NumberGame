const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = Number(msg);

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    if (speechSynthesisAllowed) {
      const msgToSay = new SpeechSynthesisUtterance(
        "That is not a valid number!"
      );
      speechSynthesis.speak(msgToSay);
    }
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    if (speechSynthesisAllowed) {
      const msgToSay = new SpeechSynthesisUtterance(
        "Number must be between 1 and 100!"
      );
      speechSynthesis.speak(msgToSay);
    }
    return;
  }

  // Check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>Go lower!</div>";
    if (speechSynthesisAllowed) {
      const msgToSay = new SpeechSynthesisUtterance("Go lower!");
      speechSynthesis.speak(msgToSay);
    }
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
    if (speechSynthesisAllowed) {
      const msgToSay = new SpeechSynthesisUtterance("Go higher!");
      speechSynthesis.speak(msgToSay);
    }
  }
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});

//Speak
const allow = document.getElementById("allow");
let speechSynthesisAllowed = false;

allow.addEventListener("click", () => {
  speechSynthesisAllowed = true;
});
