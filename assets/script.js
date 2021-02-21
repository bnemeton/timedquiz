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
var savedScores = [];
var timeLeft = 30;
var timerEl = document.querySelector("#timer")
var answersRadio = 0;
var intervalID;

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

//function to start quiz again
function playAgain() {
    score = 0;
    document.querySelector("#score").innerHTML = score + " points out of 3.";

    clearInterval(intervalID);
    timeLeft = 30;
    interval();

    currentQuestion = 0;
    document.querySelector("#scoreCard").style.display = "none";
    document.querySelector("#quizCard").style.display = "block";

    questionEl.innerHTML = questions[currentQuestion].q
    firstAnswerLabel.innerHTML = questions[currentQuestion].options[0];
    secondAnswerLabel.innerHTML = questions[currentQuestion].options[1];
    thirdAnswerLabel.innerHTML = questions[currentQuestion].options[2];
    fourthAnswerLabel.innerHTML = questions[currentQuestion].options[3];
};

//function to end timer and display results
function results() {
    clearInterval(intervalID);
    document.querySelector("#scoreCard").style.display = "block";
    document.querySelector("#quizCard").style.display = "none";
    var initials = window.prompt("Please enter initials or a name to save your score.")
    savedScores.push({initials: initials, score: score})
    document.querySelector("#scores").innerHTML = "";
    
    for (var i = 0; i < savedScores.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = savedScores[i].initials + ": " + savedScores[i].score;
        document.querySelector("#scores").appendChild(item);
    }
};

//begin the quiz
var begin = function() {
    score = 0;
    console.log("beginning")
    timerEl.innerHTML = timeLeft + " seconds remaining...";
    nextQuestion();
    return;
}

//tell whether an answer is correct; award points or subtract time appropriately
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

//set up the timer
function interval() {
    intervalID = setInterval(function(){
    timerEl.innerHTML=timeLeft + " seconds remaining...";
    timeLeft--;
    localStorage.setItem("timeLeft", timeLeft);
    if (timeLeft <= 0){
        clearInterval(intervalID)
      alert("You're out of time!");
      results();
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
        clearInterval(intervalID);
       results();
    }


});

//add event listener to start button
startBtn.addEventListener("click", function(){
    begin();
    interval();
});

//listener on the play again button
playAgainBtn.addEventListener("click", function() {
    playAgain();
});

 
