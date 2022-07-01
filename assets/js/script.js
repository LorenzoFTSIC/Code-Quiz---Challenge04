var startButtonBox = document.getElementById("startButtonBox")
var gameArea = document.getElementById("gameArea")
var winScreen = document.getElementById("endGameWinScreen")
var loseScreen = document.getElementById("endGameLoseScreen")
var question = document.getElementById("question")
var submitScoreButton = document.getElementById("")
var totalTime = 240
var timeLeft = totalTime - 1;
var timerInterval;
var display = document.getElementById("timer");
var timerFlag = false
var currentQuestion = ""
var scores = [
    {
        "Username" : "Scores"
    }
]
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
    {
        title: "The property in CSS used to change the background color of an element is -",
        choices: ["bgcolor","color","background-color","All of the above"],
        answer: "C"
    },
    {
        title: "The property in CSS used to change the text color of an element is",
        choices: ["bgcolor","color","background-color","All of the above"],
        answer: "B"
    },
    {
        title: "The CSS property used to control the element's font-size is",
        choices: ["text-style","text-size","font-size","None of the above"],
        answer: "C"
    },
    {
        title: "The HTML attribute used to define the inline styles is",
        choices: ["style","styles","class","None of the above"],
        answer: "A"
    },
    {
        title: "The HTML attribute used to define the internal stylesheet is",
        choices: ["<style>","style","<link>","<script>"],
        answer: "A"
    },
    {
        title: "Which of the following CSS property is used to set the background image of an element?",
        choices: ["background-attachment","background-image","background-color","None of the above"],
        answer: "B"
    },
    {
        title: "Which of the following is the correct syntax to make the background-color of all paragraph elements to yellow?",
        choices: ["p {background-color : yellow;}","p {background-color : #yellow;}","all {background-color : yellow;}","all p {background-color : #yellow;}"],
        answer: "A"
    },
    {
        title: "Which of the following is the correct syntax to display the hyperlinks without any underline?",
        choices: ["a {text-decoration : underline;}","a {decoration : no-underline;}","a {text-decoration : none;}","None of the above"],
        answer: "C"
    },
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
    usernames = localStorage.getItem("usernames");
    scores = localStorage.getItem("scores")
    gameArea.style.display = "none";
    winScreen.style.display = "flex";
    submitScore()
}

function submitScore() {
    var submittedUsername = document.getElementById("highScoreUsername").value;
    // localStorage.setItem(submittedUsername, timeLeft)
    var scoreButton = document.getElementById("submitScoreButton");
    scoreButton.addEventListener("click", submitScore)
    var submittedScore = [submittedUsername, timeLeft]
    questionArray.push({submittedUsername : submittedScore})
    localStorage.setItem("scores", JSON.stringify(questionArray))
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

