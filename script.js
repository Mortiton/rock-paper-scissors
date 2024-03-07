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

function whoWins () {
    let computerChoice = getComputerChoice();
    console.log(computerChoice);
    let playerChoice = getPlayerChoice();
    console.log(playerChoice);
    
    //Player Wins
    if ((computerChoice == 'rock' && playerChoice == 'paper')
    || (computerChoice == 'paper' && playerChoice == 'scissors') 
    || (computerChoice == 'scissors' && playerChoice == 'rock')) {
        return console.log(`Computer chose ${computerChoice}.` + ' You win! :)');
    }
    //a tie
    else if (computerChoice == playerChoice) {
        return console.log(`Computer chose ${computerChoice}.` + ' Its a tie! :/');
    }
    else {
        return console.log(`Computer chose ${computerChoice}.` + ' You lose! :(');
    }
}

function playGame() {
  whoWins();
  whoWins();
  whoWins();
  whoWins();
  whoWins();
}

playGame();