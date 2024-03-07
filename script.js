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

// function playGame(playerChoice, computerChoice) {
//     if (playerChoice.toLowerCase() == 'rock')
// }

// console.log(getComputerChoice())
console.log(getPlayerChoice());
