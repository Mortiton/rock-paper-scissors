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

//set player choice
function playerChoiceClicked() {
  switch (this.id) {
    case "rock-btn":
      playerChoice = "rock";
      break;
    case "paper-btn":
      playerChoice = "paper";;
      break;
    case "scissor-btn":
      playerChoice = "scissors";;
      break;
  }
  whoWins();
}

//Assigns the fade-out class so that elements are faded to opacity 0. A promise is used to ensure 
//the transitions ends before additional code is run.
function assignClass(elements, newClass) {
  return new Promise((resolve, reject) => {
    elements.forEach((element) => {
      element.classList.add(newClass);
      element.addEventListener('transitionend', resolve, { once: true });
    });
  });
}

function displayWinner(winner) {
  //fade the elements out from the screen
    assignClass([rockBtn,paperBtn,scissorBtn, typedText, playerScoreboard, computerScoreboard, cursor], "fade-out").then(()=>{;
  //Remove elements from the screen
    removeText();
    cursor.textContent ="";
    removeButtons([rockBtn, paperBtn, scissorBtn]);
    playerScoreboard.textContent = "";
    computerScoreboard.textContent = "";

    //Display Winner
    buttonDiv.id='winner-text'
    buttonDiv.textContent= `${winner} wins!`
})
}

function checkScore(){
  const delayTime = 1000;
  if (playerScore >= 1) {
    setTimeout(() => {
    displayWinner("Player");
    }, delayTime); 
  }
  else if (computerScore >=1){
    setTimeout(()=> { 
    displayWinner("Computer");
  }, delayTime);
  removeClickEvent([rockBtn, paperBtn, scissorBtn], playerChoiceClicked); 
}
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
        checkScore();
      });
    }
    //a tie
    else if (computerChoice == playerChoice) {
      changeText(`I Choose ${computerChoice}...Its a tie! :/ `);
      //Player loses
    } else {
      changeText(`I Choose ${computerChoice}...Woo! :D`).then(() => {
        computerScore += 1;
        computerScoreboard.textContent = "Computer: " + computerScore;
        checkScore();
      });
    }
  }



//DOM

//DOM declarations
const typedText = document.querySelector("#typed-text");
const gameDiv = document.querySelector("#screen");
const buttonDiv = document.querySelector("#btn-container");
const gameContainer = document.querySelector("#game-container");
const cursor = document.querySelector("#keyboard-cursor");
//Scoreboard
const playerScoreboard = document.querySelector("#player-score");
const computerScoreboard = document.querySelector("#computer-score");

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

//remove click Events
function removeClickEvent(buttons, clickFunction){
  buttons.forEach((button) => button.removeEventListener("click", clickFunction));
}

//Button event listeners
addClickEvent(playBtn, playBtnClicked);
addClickEvent(noBtn, noBtnClicked);
addClickEvent(fineBtn, playBtnClicked);
addClickEvent(rockBtn, playerChoiceClicked);
addClickEvent(paperBtn, playerChoiceClicked);
addClickEvent(scissorBtn, playerChoiceClicked);

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
