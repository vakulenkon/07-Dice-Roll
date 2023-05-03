'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isPlaying;

const startGame = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true; //state variable

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImg.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
startGame(); // code inside funct therefore need to initialize it to run function at pg load

//Funct To Switch Player

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rolling the Dice
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    //1.Get Random DiceRoll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2.Display Dice

    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    //3. Check if roll 1- Switch Player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (isPlaying) {
    //1.Add curr score to active player score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >100
    if (scores[activePlayer] >= 50) {
      isPlaying = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//Reset Game
btnNew.addEventListener('click', startGame);
