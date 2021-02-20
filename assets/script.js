//set up a bunch of variables
var questionEl = document.querySelector("#question");
var startBtn = document.querySelector("#startBtn");
var submitBtn = document.querySelector("#submitBtn");
var answersEl = document.querySelector("#answers");

var firstAnswerLabel = document.querySelector("#answer1label");
var secondAnswerLabel = document.querySelector("#answer2label");
var thirdAnswerLabel = document.querySelector("#answer3label");
var fourthAnswerLabel = document.querySelector("#answer4label");

var firstAnswer = document.querySelector("#answer1");
var secondAnswer = document.querySelector("#answer2");
var thirdAnswer = document.querySelector("#answer3");
var fourthAnswer = document.querySelector("#answer4");

var score;
var timeLeft = 30;
var timerEl = document.querySelector("#timer")
var answersRadio = 0;

//store the questions and their answers in an array of objects
var questions = [
    {q: "What is the index of the first item in an array?", options: ["1", "0", "undefined", "-1"], right: "B"},
    {q: "What does the 'i' in a for loop stand for?", options: ["iterator", "nothing", "interesting", "integer"], right: "A"},
    {q: "How many primitive types are there?", options: ["2", "5", "7", "3"], right: "D"}
];

currentQuestion = 0;

//set up functions
var nextQuestion = function() {
    questionEl.innerHTML = questions[currentQuestion].q

    firstAnswerLabel.innerHTML = questions[currentQuestion].options[0];

    secondAnswerLabel.innerHTML = questions[currentQuestion].options[1];

    thirdAnswerLabel.innerHTML = questions[currentQuestion].options[2];

    fourthAnswerLabel.innerHTML = questions[currentQuestion].options[3];


}

var begin = function() {
    score = 0;
    console.log("beginning")
    timerEl.innerHTML = timeLeft + " seconds remaining...";
    nextQuestion();
    return;
}

checkAnswer = function (choice) {
    if (choice === questions[currentQuestion].right) {
        score++;
        document.querySelector("#score").innerHTML = score + " points out of 3.";
        localStorage.setItem("score", score);
        console.log(score);
        return true;
    } else {
        timeLeft -= 5;
        timerEl.innerHTML = timeLeft + " seconds remaining..."
        console.log(timeLeft);
        return false;
    }
}

function interval() {
    setInterval(function(){
    timerEl.innerHTML=timeLeft + " seconds remaining...";
    timeLeft--;
    localStorage.setItem("timeLeft", timeLeft);
    if (timeLeft === 0){
      clearInterval(interval);
      alert("You're out of time!");
      window.location.href = "results.html"
    }
  }, 1000)
};

//add event listener to submit button
submitBtn.addEventListener("click", function() {
    answersRadio = document.querySelector('input[name="answersRadio"]:checked').value;
    checkAnswer(answersRadio);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        console.log(currentQuestion)
        nextQuestion();
    } else if (currentQuestion <= questions.length-1) {
        window.location.href ="results.html";
    }


});

//add event listener to start button
startBtn.addEventListener("click", function(){
    begin();
    interval();
});

function scores() {
    document.querySelector("#score").innerHTML = localStorage.getItem("score") + " points out of 3."
    document.querySelector("#timeLeft").innerHTML = localStorage.getItem("timeLeft") + " seconds were left."
}
