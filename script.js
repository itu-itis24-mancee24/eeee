const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const messageDisplay = document.getElementById('message');

// Word for the game
const word = 'STOCK'; // The word to guess
let guessedLetters = [];
let score = 0;
let lives = 3;

// Function to display the word with SVG images
function displayWord() {
  wordDisplay.innerHTML = ''; // Clear the current display

  for (let letter of word) {
    const imgElement = document.createElement('img');

    if (guessedLetters.includes(letter)) {
      imgElement.src = `./images/${letter}.svg`; // Display SVG for the guessed letter
      imgElement.alt = letter;
    } else {
      imgElement.src = './images/blank.svg'; // Display placeholder for hidden letters
      imgElement.alt = '_';
    }

    // Style the images
    imgElement.style.width = '50px';
    imgElement.style.height = '50px';
    imgElement.style.margin = '5px';
    wordDisplay.appendChild(imgElement);
  }
}

// Function to update lives display with hearts
function updateLivesDisplay() {
  livesDisplay.textContent = `${lives} ` + '❤️'.repeat(lives);
}

// Function to check the player's guess
function checkGuess() {
  const guess = guessInput.value.toUpperCase().trim();
  guessInput.value = ''; // Clear the input field

  if (guess.length === 0) {
    setMessage('⚠️ Please enter a valid guess.', false);
    return;
  }

  if (guess === word) {
    score = 100; // Set score to 100 for guessing the full word
    setMessage('🎉 Congratulations! You won! 🎉', true);
    endGame();
  } else if (guess.length === 1) {
    if (guessedLetters.includes(guess)) {
      setMessage('⚠️ You already guessed that letter.', false);
      return;
    }

    guessedLetters.push(guess);
    if (word.includes(guess)) {
      score += 20; // Add 20 points for a correct letter
      setMessage('✅ Correct letter!', true);
    } else {
      lives--; // Deduct a life for an incorrect guess
      setMessage('❌ Incorrect guess!', false);
    }

    updateLivesDisplay();

    if (lives === 0) {
      setMessage(`💔 Game Over! The word was: ${word}`, false);
      endGame();
    }
  } else {
    setMessage('⚠️ Invalid guess. Enter one letter or the full word.', false);
  }

  updateDisplay();
}

// Function to reset the game
function resetGame() {
  guessedLetters = [];
  score = 0;
  lives = 3;
  guessInput.style.display = 'inline';
  guessButton.style.display = 'inline';
  resetButton.style.display = 'none';
  messageDisplay.textContent = '';
  updateDisplay();
}

// Function to end the game
function endGame() {
  guessInput.style.display = 'none';
  guessButton.style.display = 'none';
  resetButton.style.display = 'inline';
}

// Function to update the display elements
function updateDisplay() {
  displayWord();
  scoreDisplay.textContent = score;
  updateLivesDisplay();
}

// Function to set messages
function setMessage(message, isSuccess) {
  messageDisplay.textContent = message;
  messageDisplay.style.color = isSuccess ? 'green' : 'red';
}

// Event listeners
guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);

// Initial display setup
updateDisplay();
