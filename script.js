//GAME LOGIC
const GAME_CHOICES = ["rock", "paper", "scissors"];
let playerChoice = "";
let playerScore = 0;
let computerScore = 0;

//Determine the random choice by selecting a number between 0 and 2. This refers to an index in the array
function getComputerChoice() {
  let computerChoice =
    GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];

  return computerChoice;
}
console.log(GAME_CHOICES.length);
//set player choice
function playerChoiceClicked() {
  switch (this.id) {
    case "rock-btn":
      playerChoice = "rock";
      break;
    case "paper-btn":
      playerChoice = "paper";
      break;
    case "scissor-btn":
      playerChoice = "scissors";
      break;
  }
  whoWins();
}

//determine the outcome based on computer and player choices
function whoWins() {
  let computerChoice = getComputerChoice();
  //Player Wins
  if (
    (computerChoice == "rock" && playerChoice == "paper") ||
    (computerChoice == "paper" && playerChoice == "scissors") ||
    (computerChoice == "scissors" && playerChoice == "rock")
  ) {
    changeText(`I Choose ${computerChoice}... Oh :(`).then(() => {
      playerScore += 1;
      playerScoreboard.textContent = "Player: " + playerScore;
    });
  }
  //a tie
  else if (computerChoice == playerChoice) {
    changeText(`I Choose ${computerChoice}...Its a tie! :/ `);
    //Player loses
  } else {
    changeText(`I Choose ${computerChoice}...Woo! :D`).then(()=> {
      computerScore += 1;
      computerScoreboard.textContent = "Computer: " + computerScore;
    })
  }
}

// //Function for the computer text while playing. Display computer choice and an icon
// function textDuringGame(computerChoice) {
//   changeText(`I choose...${computerChoice}`)
// }

//DOM

//DOM constants
const DELAY_TIME = 2000;
const typedText = document.querySelector("#typed-text");
const gameDiv = document.querySelector("#screen");
const buttonDiv = document.querySelector("#btn-container");
//Scoreboard
const playerScoreboard = document.querySelector("#player-score");
const computerScoreboard = document.querySelector("#computer-score");
//Icon
const iconSpan = document.querySelector("#icon-container");

//BUTTONS

//Function to create buttons
function createButton(id) {
  button = document.createElement("button");
  button.setAttribute("id", id);
  return button;
}

// Function to append buttons
function appendButtons(buttons) {
  buttons.forEach((button) => buttonDiv.appendChild(button));
}

//Function to remove buttons
function removeButtons(buttons) {
  buttons.forEach((button) => buttonDiv.removeChild(button));
}
//create buttons
const playBtn = createButton("play-btn");
const noBtn = createButton("no-btn");
const fineBtn = createButton("fine-btn");
const rockBtn = createButton("rock-btn");
const paperBtn = createButton("paper-btn");
const scissorBtn = createButton("scissor-btn");

//Add click events
function addClickEvent(button, clickFunction) {
  button.addEventListener("click", clickFunction);
}

//Button event listeners
addClickEvent(playBtn, playBtnClicked);
addClickEvent(noBtn, noBtnClicked);
addClickEvent(fineBtn, playBtnClicked);
addClickEvent(rockBtn, playerChoiceClicked);
addClickEvent(paperBtn, playerChoiceClicked);
addClickEvent(scissorBtn, playerChoiceClicked);

//TEXT

//Typing effect
function typeWriter(text) {
  return new Promise((resolve, reject) => {
    let charIndex = 0;
    const speed = 60;

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

//Remove typed text
function removeText() {
  typedText.textContent = "";
}

//Change top typed text
function changeText(text) {
  return new Promise((resolve, reject) => {
    removeText();
    typeWriter(text).then(() => {
      resolve();
    });
  });
}

//Starting screen
typeWriter("Do you want to play a game?").then(() => {
  appendButtons([playBtn, noBtn]);
});
// setTimeout(() => {
//   appendButtons([playBtn, noBtn]);
// }, DELAY_TIME);

//Play or fine button click function
function playBtnClicked() {
  switch (this.id) {
    case "play-btn":
      removeButtons([playBtn, noBtn]);
      break;
    case "fine-btn":
      buttonDiv.removeChild(fineBtn);
      break;
  }
  removeText();
  typeWriter("Yay! Now make your choice.").then(() => {
    appendButtons([rockBtn, paperBtn, scissorBtn]);
    playerScoreboard.textContent = "Player: " + playerScore;
    computerScoreboard.textContent = "Computer: " + computerScore;
  });
}

//No button click function
function noBtnClicked() {
  buttonDiv.removeChild(playBtn);
  buttonDiv.removeChild(noBtn);
  removeText();
  typeWriter("Okay :(").then(() => {
    buttonDiv.appendChild(fineBtn);
  });
}
