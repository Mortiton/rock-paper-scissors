//An array which contains the computers choices in the game
const gameChoices = ["rock", "paper", "scissors"];

//Determine the random choice by selecting a number between 0 and 2. This refers to an index in the array
function getComputerChoice() {
  let computerChoice = gameChoices[Math.floor(Math.random() * 3)];

  return computerChoice;
}

//Prompts the user to input their choice and converts it to lowercase
function getPlayerChoice() {
  let playerChoice = prompt("What do you pick?");

  return playerChoice.toLowerCase();
}

//determine the outcome based on computer and player choices
function whoWins() {
  let computerChoice = getComputerChoice();
  let playerChoice = getPlayerChoice();
  //Player Wins
  if (
    (computerChoice == "rock" && playerChoice == "paper") ||
    (computerChoice == "paper" && playerChoice == "scissors") ||
    (computerChoice == "scissors" && playerChoice == "rock")
  ) {
    return console.log(`Computer chose ${computerChoice}.` + " You win! :)");
  }
  //a tie
  else if (computerChoice == playerChoice) {
    return console.log(`Computer chose ${computerChoice}.` + " Its a tie! :/");
  //Player loses
  } else {
    return console.log(`Computer chose ${computerChoice}.` + " You lose! :(");
  }
}

function playGame() {
  whoWins();
}

const typedText = document.querySelector("#typed-text");

//typing effect with a promise. This is so I can ensure the text is displayed before a button is created
function typeWriter(text) {
  return new Promise((resolve, reject) => {
    let charIndex = 0;
    const speed = 50;

    function type() {
      if (charIndex < text.length) {
        typedText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }

    type();
  });
}

//starting text
document.addEventListener('DOMContentLoaded', () => {
typeWriter("Do you want to play a game?").then(() => {
  setTimeout(() => {
    //select the button
    const button = document.querySelector("#play-btn");
    button.textContent = "Test";
    const gameDiv = document.querySelector("#game-container");
    gameDiv.appendChild(button);

    typedText.focus();
  }, 1000); //delay the button display by 1 second
});
});
//Create a button
