const minNum = 1;
const maxNum = 100;

let answer;
let attempts;
let bestScore = localStorage.getItem("bestScore") || "--";

const minEl = document.getElementById("min");
const maxEl = document.getElementById("max");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const bestScoreEl = document.getElementById("bestScore");

minEl.textContent = minNum;
maxEl.textContent = maxNum;
bestScoreEl.textContent = bestScore;

function startGame() {
  answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  attempts = 0;
  attemptsEl.textContent = attempts;
  message.textContent = `Start guessing...`;
  guessInput.value = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.focus();
}

function checkGuess() {
  const guess = Number(guessInput.value);

  if (guessInput.value === "") {
    message.textContent = "Please enter a number";
    return;
  }

  if (isNaN(guess)) {
    message.textContent = "Invalid input";
    return;
  }

  if (guess < minNum || guess > maxNum) {
    message.textContent = `Enter a number between ${minNum} and ${maxNum}`;
    return;
  }

  attempts++;
  attemptsEl.textContent = attempts;

  if (guess < answer) {
    message.textContent = "Too low! Try again.";
  } else if (guess > answer) {
    message.textContent = "Too high! Try again.";
  } else {
    message.textContent = `Correct! The answer was ${answer}`;
    guessInput.disabled = true;
    submitBtn.disabled = true;

    if (bestScore === "--" || attempts < Number(bestScore)) {
      bestScore = attempts;
      localStorage.setItem("bestScore", bestScore);
      bestScoreEl.textContent = bestScore;
    }
  }

  guessInput.value = "";
  guessInput.focus();
}

submitBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

restartBtn.addEventListener("click", startGame);

startGame();