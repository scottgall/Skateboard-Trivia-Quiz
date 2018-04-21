 
$( document ).ready(function() {

var correct;
var incorrect;
var unanswered;
var intervalId;
var answerTimer = 6;
var currentQuestion = 0;
var timeLeft = 13;
var questions = [
{
    question: "What's the term that describes someone pushing with their front foot?",
    choices: ["steez", "schneider", "mongo", "goofy"],
    answer: 2
},  
{
    question: "A skateboard should never be carried by the _______?",
    choices: ["truck", "tail", "deck", "wheel"],
    answer: 0
},
{
    question: "Who is the only person to win Thrasher Magazine's 'Skater of the Year' award twice?",
    choices: ["Eric Koston", "Tony Hawk", "Danny Way", "Chris Cole"],
    answer: 3
},
{
    question: "Which skateboard component was notorious for breaking up until just a few years ago?",
    choices: ["bushing", "kingpin", "axel", "pivot cup"],
    answer: 1
},
{
    question: "Who attempted to ollie the infamous Leap of Faith?",
    choices: ["Jamie Thomas", "Andrew Reynolds", "Jaws", "Ali Boulala"],
    answer: 0
},
{
    question: "In 2009, this skater announced his early retirement from professional skateboarding to pursue a rap career.",
    choices: ["Terry Kennedy", "Ragdoll", "Lizard King", "Jereme Rogers"],
    answer: 3
},
{
    question: "Which fliptrick was Chad Muska known for doing in such a distinctive way that it was coined a 'Muska Flip'?",
    choices: ["fs flip", "hardflip", "varial heelflip", "bs flip"],
    answer: 0
},
{
    question: "What is former-pro Ragdoll's real name?",
    choices: ["Jesse Plumb", "Anthony Scalamere", "Andrew Schneider", "Bill Danforth"],
    answer: 1
},
{
    question: "What is skateboarding slang for stylish?",
    choices: ["stylie", "breezy", "steezy", "sweety"],
    answer: 2
}
];

// new game function called when page loads and after clicking 'start over' button
function newGame() {
    // reset variables
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    currentQuestion = 0;
    // display start button, title, & image
    $("#start").css('display', 'block');
    $("#title").text('Skateboard Trivia Quiz');
    $("#results").html('<img src="assets/images/main.jpg">');
}

// display question function called when begin button pressed and after question answer shown
function displayQuestion() {
    // clear starting page image
    $("#results").empty();
    // check if no more questions left
    if (currentQuestion === questions.length) {
        displayResults();
        return;
    }
    // if questions left
    current = questions[currentQuestion];
    // display current question
    $("#title").text(current['question']);
    // loop through choices, placing them in buttons
    for (i = 0; i < current['choices'].length; i++) {
        $("#choice" + i).text(current['choices'][i]);
    }
    // display choice buttons
    $(".choice").css('display', 'block');
    // set interval
    intervalId = setInterval(decrement, 1000);
    // display countdown
    $("#timer").html("<h2>Time left: " + timeLeft + "</h2>");
}

// check answer function called when answer clicked
function checkAnswer(x) {
    // compare value of answer button clicked with correct answer
    // returns true or false
    return x === questions[currentQuestion]['answer'];
}

// get answer text function grabs correct answer string from choices
function getAnswerText() {
    current = questions[currentQuestion];
    return current['choices'][current['answer']];
}

// display answer function called when time runs up or answer chosen
function displayAnswer(x) {
    // display corresponding gif
    $("#results").html("<img src='assets/images/pic" + currentQuestion + ".gif'>");
    $(".choice").css('display', 'none');
    $("#title").html(x + '<br>The answer was ' + getAnswerText() + '.');
    // set timeout for answer display page
    setTimeout(function() {currentQuestion++; displayQuestion()}, answerTimer * 1000);
}

// display results function called within displayQuestion() when there's no more questions left
function displayResults() {
    $("#results").html('<img src="assets/images/main2.gif">');
    $("#title").text("That's it!");
    $("#results").append("<h2>Correct - " + correct + "<br>Incorrect - " + incorrect + "<br>Unanswered - " + unanswered + "</h2>");
    $("#restart").css('display', 'block');

}

// decrement called at question setInterval in displayQuestion()
function decrement() {
    timeLeft--; 
    //  display time left
    $("#timer").html("<h2>Time left: " + timeLeft + "</h2>");
    if (timeLeft === 0) {
        stop();
        displayAnswer("Time's up"); 
        unanswered++;
    }
}

// stop function called when answer timer runs up or choice clicked
function stop() {
    // hide timer, clear interval, reset timer
    $("#timer").empty();
    clearInterval(intervalId);
    timeLeft = 13;
}

// answer choice on click function
$(".choice").on('click', function () {
    // turn value attribute of button clicked into integer and set as variable
    val = parseInt($(this).val());
    stop();
    result = checkAnswer(val);
    // if checkAnswer() returns true
    if (result) {
        correct++;
        displayAnswer("Correct!");
    // if checkAnswer() returns false
    } else {
        incorrect++;
        displayAnswer("Incorrect!");
    }
})

$("#start").on('click', function () {
    $("#start").css('display', 'none');
    displayQuestion();
})

$("#restart").on('click', function () {
    $("#restart").css('display', 'none');
    // $("#results").html('<img src="assets/images/main.jpg">');
    newGame();
})

newGame();

});

