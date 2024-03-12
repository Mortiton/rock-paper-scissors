//GAME LOGIC
const gameChoices = ["rock", "paper", "scissors"];

//Determine the random choice by selecting a number between 0 and 2. This refers to an index in the array
function getComputerChoice() {
  let computerChoice =
    gameChoices[Math.floor(Math.random() * gameChoices.length)];

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

//DOM constants
const typedText = document.querySelector("#typed-text");
const gameDiv = document.querySelector("#screen");
const buttonDiv = document.querySelector("#btn-container");

//play Buttons - main screen
const playBtn = document.createElement("button");
const noBtn = document.createElement("button");
const fineBtn = document.createElement("button");
playBtn.setAttribute("id", "play-btn");
noBtn.setAttribute("id", "no-btn");
fineBtn.setAttribute("id", "fine-btn");

//typing effect
function typeWriter(text) {
  let charIndex = 0;
  const speed = 50;

  function type() {
    if (charIndex < text.length) {
      typedText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    }
  }
  type();
}

//remove typed text
function removeText() {
  typedText.textContent = "";
}

//Starting screen
typeWriter("Do you want to play a game?");
setTimeout(() => {
  buttonDiv.appendChild(playBtn);
  buttonDiv.appendChild(noBtn);
}, 2000); //delayed by 2s (1000ms = 1s)

//Choice Buttons
const rockBtn = document.createElement("button");
const paperBtn = document.createElement("button");
const scissorBtn = document.createElement("button");
rockBtn.setAttribute("id", "rock-btn");
paperBtn.setAttribute("id", "paper-btn");
scissorBtn.setAttribute("id", "scissor-btn");

//Play button click function
function playBtnClicked() {
  if (this.id == "play-btn") {
    buttonDiv.removeChild(playBtn);
    buttonDiv.removeChild(noBtn);
  } else {
    buttonDiv.removeChild(fineBtn);
  }
  removeText();
  typeWriter("Yay! Now which do you pick?");
  buttonDiv.appendChild(rockBtn);
  buttonDiv.appendChild(paperBtn);
  buttonDiv.appendChild(scissorBtn);

}

//No button click function
function noBtnClicked() {
  buttonDiv.removeChild(playBtn);
  buttonDiv.removeChild(noBtn);
  removeText();
  typeWriter("Okay :(");
  setTimeout(() => {
    buttonDiv.appendChild(fineBtn);
  }, 1000); //delayed by one second (1000ms = 1s)
}

//Button event listeners
playBtn.addEventListener("click", playBtnClicked);
noBtn.addEventListener("click", noBtnClicked);
fineBtn.addEventListener("click", playBtnClicked);
