var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence () {
  var newNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[newNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#"+randomChosenColor).fadeOut(50);
  $("#"+randomChosenColor).fadeIn(50);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  userClickedPattern = [];
  level = level + 1;
  $("h1").text("Level "+level);
}

$("div.btn").on("click", function (e) {
  var userChosenColor = e.target.id
  $(e.target).fadeOut(50);
  $(e.target).fadeIn(50);
  userClickedPattern.push(userChosenColor)
  console.log(userClickedPattern)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length - 1)
})

function playSound (name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
  }

function animatePress (currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
  $("#"+currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function () {
  if (!started) {
    $("h1").text("Level "+level)
    nextSequence()
    started = true
    }
  })

function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("CORRECT!")
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000)
    }
  }
  else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, Press Any Key to Continue.")
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)
    console.log("WRONG!");
    startOver();
  }
}

function startOver () {
  level = 0
  gamePattern = []
  started = false
}
