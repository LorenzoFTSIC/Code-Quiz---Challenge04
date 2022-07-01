var startButtonBox = document.getElementById("startButtonBox")
var gameArea = document.getElementById("gameArea")
var winScreen = document.getElementById("endGameWinScreen")
var loseScreen = document.getElementById("endGameLoseScreen")
var question = document.getElementById("question")
var submitScoreButton = document.getElementById("")
var totalTime = 60
var timeLeft = totalTime - 1;
var timerInterval;
var display = document.getElementById("timer");
var timerFlag = false
var currentQuestion = ""
var questionArray = [
    {
        title: "CSS stands for:",
        choices: ["Cataract Style Sheet","Color and Style Sheets","Cascading Style Sheets","Counter Strike: Source"],
        answer: "C"
    },
    {
        title: "Which of the following is the correct syntax for referring the external style sheet?",
        choices: ["<style src = example.css>",`<style src = "example.css" >`,"<stylesheet> example.css </stylesheet>",`<link rel="stylesheet" type="text/css" href="example.css">`],
        answer: "D"
    },
    // {
    //     title: "",
    //     choices: ["","","",""],
    //     answer: ""
    // }
]
var remainingQuestions = questionArray


// main game functions, holds questions and event listeners for answers
function mainGame() {
    var answerA = document.getElementById("answerA")
    var answerB = document.getElementById("answerB")
    var answerC = document.getElementById("answerC")
    var answerD = document.getElementById("answerD")
    currentQuestion = nextQuestion();
    answerA.addEventListener("click", handleAnswerSubmit);
    answerB.addEventListener("click", handleAnswerSubmit);
    answerC.addEventListener("click", handleAnswerSubmit);
    answerD.addEventListener("click", handleAnswerSubmit);
}


// check submitted answer, if wrong remove seconds depending on the situation if <= 10 seconds remaining, just set it to 0, any higher remove 10 seconds from timer
function handleAnswerSubmit() {
    currentAnswer = currentQuestion["answer"]
    console.log(this.dataset.answer)
    if (this.dataset.answer === currentAnswer) {
        nextQuestion()
    } else {
        if (timeLeft <= 10) {
            timeLeft = 0
            display.textContent = timeLeft;
        } else {
            timeLeft = timeLeft - 10;
            display.textContent = timeLeft;
        }
    }
    if (timeLeft === 0) {
        endGameLose();
    }
}

// make sure there's more questions in the list, then change questions
function nextQuestion() {
    if (remainingQuestions.length > 0){
        var choiceA = document.getElementById("choiceA")
        var choiceB = document.getElementById("choiceB")
        var choiceC = document.getElementById("choiceC")
        var choiceD = document.getElementById("choiceD")
        currentQuestion = remainingQuestions.pop();
        question.textContent = currentQuestion["title"]
        console.log(currentQuestion["choices"[0]])
        choiceA.textContent = currentQuestion["choices"][0]
        choiceB.textContent = currentQuestion["choices"][1]
        choiceC.textContent = currentQuestion["choices"][2]
        choiceD.textContent = currentQuestion["choices"][3]
        return currentQuestion
    } else {
        endGameWin();
        clearInterval(timerInterval);
    }
}

// win game, display score and input name
function endGameWin() {
    gameArea.style.display = "none";
    winScreen.style.display = "flex";
    var scoreButton = document.getElementById("submitScoreButton");
    scoreButton.addEventListener("click", submitScore)
}

function submitScore() {
    var submittedUsername = document.getElementById("highScoreUsername").value;
    localStorage.setItem(submittedUsername, timeLeft)
    // localStorage.setItem("score", timeLeft)
}

// lose game
function endGameLose() {
    gameArea.style.display = "none";
    loseScreen.style.display = "flex";
}

//timer setup and decrement
function timing() {
    display.textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        endGameLose();
    }
}

// main game function, show game elements, hide start button, set game flag + show time
function startGame() {
    startButtonBox.style.display = "none";
    gameArea.style.display = "flex";
    display.textContent = totalTime;
    timerFlag = true;
    timerInterval =  setInterval(timing, 1000);
    mainGame();
}

startButton.addEventListener("click", startGame);

