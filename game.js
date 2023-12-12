var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //empty array for the pattern
var userClickedPattern = []; // empty array for user's pattern
var started = false; //game has not started
var level = 0;

// press any key to start a new game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); // add user's pattern to the array
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, press any key to restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = []; //reset user's pattern
  level++; // increase level
  $("#level-title").text("Level " + level); //update level title
  var randomNumber = Math.floor(Math.random() * 4); // generate random numbers
  var randomChosenColour = buttonColours[randomNumber]; // random number to pick random colour
  gamePattern.push(randomChosenColour); // add random colour to the pattern

  //add animation to the button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
