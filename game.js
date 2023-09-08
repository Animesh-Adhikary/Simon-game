
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var start = false;

// at the starting point
$(document).keypress(function () {
    if (!start) {
       nextSequence();
       start = true;
    }
});

// for cpu
function nextSequence() {
    level = level + 1;
    $("h1").text("Level  " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// for user
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animation(userChosenColor);

    compairing(userClickedPattern.length - 1);
});

// compairing
function compairing(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            userClickedPattern.length = 0;
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("h1").text("Game Over, Press any key to start...");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        gamePattern.splice(0, gamePattern.length);
        userClickedPattern.splice(0, userClickedPattern.length);
        level = 0;
        $(document).keypress(function(){
                setTimeout(function(){
                nextSequence();
            },1000);
        });
    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animation(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100)
}


