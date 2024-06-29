const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

document.addEventListener("keypress", () => {
  const green = document.getElementById("green");
  const red = document.getElementById("red");
  const blue = document.getElementById("blue");
  const yellow = document.getElementById("yellow");
  const title = document.getElementById("level-title");

  const greenHandler = () => onClick("green");
  const redHandler = () => onClick("red");
  const blueHandler = () => onClick("blue");
  const yellowHandler = () => onClick("yellow");

  initializeEventListeners();

  if (!started) {
    title.textContent = `Level ${level}`;
    nextSequence();
    started = true;
  }

  function nextSequence() {
    level++;
    userPattern = [];
    title.textContent = `Level ${level}`;
    gamePattern = generatePattern(level);
    playPattern();
  }

  function generatePattern(level) {
    let arr = [];
    for (let i = 0; i < level; i++) {
      let x = Math.floor(Math.random() * 4);
      arr.push(buttonColors[x]);
    }
    return arr;
  }

  function playPattern() {
    setTimeout(() => {
      console.log("I'm here!");
      console.log(gamePattern);
      for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
          playSound(gamePattern[i]);
          animatePress(gamePattern[i]);
        }, 1000 * i);
      }
    }, 1000);
  }

  function onClick(color) {
    userPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(userPattern.length - 1);
  }

  function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
  }

  function animatePress(color) {
    const activeButton = document.querySelector(`.${color}`);
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      document.body.classList.add("game-over");
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 200);
      title.textContent = "Game Over, Press Any Key to Restart";
      removeEventListeners();
      startOver();
    }
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    userPattern = [];
    started = false;
  }

  function initializeEventListeners() {
    green.addEventListener("click", greenHandler);
    red.addEventListener("click", redHandler);
    blue.addEventListener("click", blueHandler);
    yellow.addEventListener("click", yellowHandler);
  }

  function removeEventListeners() {
    green.removeEventListener("click", greenHandler);
    red.removeEventListener("click", redHandler);
    blue.removeEventListener("click", blueHandler);
    yellow.removeEventListener("click", yellowHandler);
  }
});
