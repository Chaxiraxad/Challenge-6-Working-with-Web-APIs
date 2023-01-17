//Needed variables
var counter = 100
var timer;
var questionsCounter = 0;
var storedScore = localStorage.getItem("count");

//DOM elements
var startButton = document.querySelector('#start');
var questionsContainer = document.querySelector("#questions")
var timerElement = document.querySelector("#time")
var questionTitle = document.querySelector("#question-title")
var choicesContainer = document.querySelector("#choices")
var listElements = document.querySelectorAll("li")
var endElement = document.querySelector("#end-screen")
var startScreenElement = document.querySelector("#start-screen")
var finalScore = document.querySelector("#final-score")
var submitButton = document.querySelector("#submit")

//Array containinq questions
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: [{ answer: "<javascript>", correct: false }, { answer: "<script>", correct: true }, { answer: "<js>", correct: false }, { answer: "<scripting>", correct: false }],
    },
    {
        title: "Which of these expressions would be falsy in JavaScript?",
        choices: [{ answer: "null", correct: true }, { answer: "5", correct: false }, { answer: "'Hello'", correct: false },],
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: [{ answer: "The <body> section", correct: true}, { answer: "Both the <head> section and the <body> section are correct", correct: false }, { answer: "The <head> section", correct: false }]
    },
    {
        title: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        choices: [{ answer: "<script href=\"xxx.js\"", correct: false }, { answer: "<script scr=\"xxx.js\"", correct: true }, { answer: "<script name=\"xxx.js\"", correct: false }]
    }
]


//Click events

//Click event for "start" button
startButton.addEventListener('click', function () {

    startButton.setAttribute('class', 'hide');
    questionsContainer.setAttribute('class', 'visible');

    populateQuestion(questions[questionsCounter]);

    timer = setInterval(function () {
        counter--;
        timerElement.textContent = counter
        if (counter <= 0) {
            endGame()
            clearInterval(timer);
        }
    }, 1000);
});



//All functions

//Function to reload the page when timer reaches 0
function endGame() {
    // location.reload()
    endElement.setAttribute('class', 'visible');
    startScreenElement.setAttribute('class', 'hide');
    questionsContainer.setAttribute('class', 'hide');
    finalScore.innerHTML = localStorage.getItem("count");

}

function populateQuestion(question) {
    questionTitle.textContent = question.title
    var choices = question.choices;
    choicesContainer.innerHTML = '';

    var choicesList = document.createElement('ul');
    choicesList.classList.add("list-wrapper");
    //Add click event to <ul></ul> holding all the questions choices
    choicesList.addEventListener('click', handleChoicesClick, false);

    for (let i = 0; i < choices.length; i++) {
        var choice = document.createElement('li');
        choice.classList.add(choices[i]["correct"]);
        choice.textContent = choices[i]["answer"];
        choicesList.appendChild(choice);
    }
    choicesContainer.appendChild(choicesList)
}

//Function to fire after clicking in list items to verify the value to the class and determine if answer is wrong or right
function handleChoicesClick(e) {
    if (e.target.matches('li')) {
        if (e.target.classList.value == "true") {
            checkChoiceValidity("true")
        } else {
            checkChoiceValidity("false")
        }
    }
}

function checkChoiceValidity(choiceValue) {
    if (choiceValue == "true") {
        console.log("You are right")
        storedScore++
        localStorage.setItem("count", storedScore);
        nextQuestion()
    } else {
        console.log("You are wrong")
        counter = counter - 10
    }
}


function nextQuestion() {
    questionsCounter++;
    if (questionsCounter < questions.length) {
        populateQuestion(questions[questionsCounter]);
    } else {
        endGame(timer);
        clearInterval(timer)
    }
}

submitButton.addEventListener("click", function(){
    var userScore = storedScore
    var userInitials = document.getElementById("initials").value
    console.log(userScore, userInitials)
})
