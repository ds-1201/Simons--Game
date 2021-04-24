
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var gameStart = false;
var level = 0;

// Big Three Important Functions

function nextSequence() 
{
    level = level+1;
    $("h1").text("Level :" + level);
    gameStart = true;
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    userClickedPattern = [];
    setTimeout(function()  {
        playSound(randomChosenColor);
        buttonAnimation(randomChosenColor);
    }, 1000);
    
}

function checkAnswer(currentLevel)
{
    var i=0;
    while(i<currentLevel && currentLevel<=level)
    {
        if(gamePattern[i] != userClickedPattern[i])
        {
            gameOver();
            return;
        }
        i++;
    }
    if(currentLevel === level)
    {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
    
}

function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    level = 0;
    gamePattern = [];
    setTimeout(function() {
        $("body").removeClass("game-over");
        gameStart=false;
    }, 200);
}

// Functions To Play Sound And Animation

function buttonAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Event Listners

$(document).keypress(function () {
  if (!gameStart) {
    nextSequence();
  }
});

$(".btn").click(function () {
  if (gameStart) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    buttonAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length);
  }
});

