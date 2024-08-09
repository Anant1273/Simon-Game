var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var score = 0;
var started = false;

$(document).keypress(function(event) {
  if (!started && event.key === " ") { // Check if the key pressed is the spacebar
    $("#level-title").text("Level " + level);
    $("#instructions").show(); // Show instructions
    $("#score-container").hide(); // Ensure score container is hidden initially
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");
    $("#instructions").hide(); // Hide instructions
    $("#score-container").show(); // Show score container
    $("#score-value").text(score); // Display score
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  score = level - 1; // Update score based on the level
  $("#level-title").text("Level " + level);
  $("#score-value").text(score); // Update score display
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(400).fadeOut(400).fadeIn(400);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  score = 0; // Reset score
  gamePattern = [];
  started = false;
  $("#instructions").hide(); // Hide instructions after game over
}
