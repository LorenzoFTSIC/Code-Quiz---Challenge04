var startButtonBox = document.getElementById("startButtonBox")
var gameArea = document.getElementById("gameArea")
var answerA = document.getElementById("answerA")
var answerB = document.getElementById("answerB")
var answerC = document.getElementById("answerC")
var answerD = document.getElementById("answerD")
var totalTime = 60
var timeLeft = totalTime - 1;

var questions = [
    {
        title: "CSS stands for:",
        choices: ["Cataract Style Sheet","Color and Style Sheets","Cascading Style Sheets","Counter Strike: Source"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "Which of the following is the correct syntax for referring the external style sheet?",
        choices: ["<style src = example.css>",`<style src = "example.css" >`,"<stylesheet> example.css </stylesheet>",`<link rel="stylesheet" type="text/css" href="example.css">`],
        answer: `<link rel="stylesheet" type="text/css" href="example.css">`
    },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // },
]

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        // seconds = parseInt(timer % 60, 30);
        display.textContent = seconds;
        seconds = parseInt(timer % 60, 10);
        if (--timer < 0) {
            timer = duration;
        }
        display.textContent = seconds;
    }, 1000);
}


function startTimer(display) {
    display = document.getElementById("timer");
    setInterval(function () {
        display.textContent = timeLeft;
        timeLeft--;


    }, 1000);
    
}

function startGame() {
    startButtonBox.style.display = "none"
    gameArea.style.display = "flex"
    // var duration = 60,
    display = document.getElementById("timer");
    display.textContent = totalTime
    startTimer(display);
}

startButton.addEventListener("click", startGame);

