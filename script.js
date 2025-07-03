const emojis = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝'];
let cards = [...emojis, ...emojis];
let firstCard, secondCard;
let lockBoard = false;
let matchedCount = 0;

const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restart');
const winMessage = document.getElementById('winMessage');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = '';
  winMessage.style.display = 'none'; // Hide win message on new game
  matchedCount = 0;

  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedCount++;

  if (matchedCount === emojis.length) {
    winMessage.style.display = 'block';
  }

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.textContent = '';
    secondCard.textContent = '';
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartButton.addEventListener('click', () => {
  resetBoard();
  createBoard();
});

createBoard(); // Initial game setup
