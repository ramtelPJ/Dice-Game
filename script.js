"use strict";

// selecting the id's of the HTML

let score0 = document.querySelector("#score--0"); // total score of the player0
let score1 = document.getElementById("score--1"); // total score of the player1

let currentVal0 = document.querySelector("#current--0"); // current value of the players
let currentVal1 = document.getElementById("current--1");

let diceImg = document.querySelector(".dice");

// buttons that has functionality
let btnNew = document.querySelector(".btn--new");
let btnHold = document.querySelector(".btn--hold");
let btnRoll = document.querySelector(".btn--roll");

let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");

// declaring the variables as required
let scores, currentScore, activePlayer, playing;

diceImg.classList.add("hidden");

// DRY principle : making the player switch function
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; // sets back the currentScore value to the Zero
  activePlayer = activePlayer === 0 ? 1 : 0; // ternary operator works same as the if else

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// DRY principle: making the initilization function
let reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentVal0.textContent = 0;
  currentVal1.textContent = 0;

  diceImg.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
reset();

// handles the roll button function
btnRoll.addEventListener("click", function () {
  if (playing) {
    let randomNumDice = Math.trunc(Math.random() * 6) + 1; // generating the random dice number
    //console.log(randomNumDice);

    diceImg.src = `dice-${randomNumDice}.png`; // manipulating the src element of the HTML

    diceImg.classList.remove("hidden");
    if (randomNumDice != 1) {
      currentScore += randomNumDice;
      //currentVal0.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// holding the Score of the player:
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// reset the game : new game button
btnNew.addEventListener("click", reset);
