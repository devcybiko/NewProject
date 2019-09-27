/**
 * Project: Trivia Example
 * Author: Greg Smith
 * Description: JQuery, Bootstrap, AJAX example Program
 * Date: 06/18/2019
 */

/**
 * GLOBAL VARIABLES
 */
var triviaQuestions = [];
var triviaCurrent = 0;
var triviaAnswer = "";
var myDebug = true;

/**
 * TOOLKIT FUNCTIONS
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * The main program
 */
function main() {
    myEnter();
    getCategories();
    myExit()
}

/**
 * CATEGORY METHODS
 */
function populateCategories(response) {
    myEnter(response);
    for (let category of response.trivia_categories) {
        //myLog(category);
        var button = $(`<a class="dropdown-item" href="#" trivia-category="${category.id}">${category.name}</a>`);
        $(button).on("click", getTriviaQuestions);
        $("#categories").append(button);
    }
    myExit();
}

function getCategories() {
    myEnter();
    var url = "https://opentdb.com/api_category.php"
    myLog(url);
    $.ajax({
        url: url,
        method: "GET"
    }).then(populateCategories);
    myExit();
}

/**
 * TRIVIA QUESTION METHODS
 */

function getTriviaQuestions(button) {
    myEnter($(this));
    var triviaURL = "https://opentdb.com/api.php";
    var amount = 10;
    var categoryId = $(this).attr("trivia-category");
    var difficulty = "easy";
    var type = "multiple";
    var queryParameters = `?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`;
    var url = triviaURL + queryParameters;
    myLog(url);
    $.ajax({
        url: url,
        method: "GET"
    }).then(startTriviaGame);
    myExit();
}

function startTriviaGame(response) {
    myEnter(response);
    triviaQuestions = response.results;
    triviaCurrent = 0;
    populateTriviaQuestion();
    myExit();
}

function scrambleAnswers(answers) {
    myEnter();
    var newAnswers = [];
    myLog(answers)
    var i = 0;
    while (newAnswers.length < answers.length) {
        var rnd = random(0, answers.length - 1);
        //myLog(rnd);
        //myLog(answers[rnd])
        if (!newAnswers.includes(answers[rnd])) {
            newAnswers[i++] = answers[rnd];
            //myLog(newAnswers);
        }
    }
    myExit(newAnswers);
    return newAnswers;
}

function populateTriviaQuestion() {
    myEnter();
    var trivia = triviaQuestions[triviaCurrent]
    triviaCurrent++;
    var question = trivia.question;
    var answers = trivia.incorrect_answers.slice(0);
    triviaAnswer = trivia["correct_answer"];
    answers.push(triviaAnswer);
    //myLog(answers);
    answers = scrambleAnswers(answers);
    //myLog(trivia);
    //myLog(triviaAnswer);
    $("#trivia-question").html(question);
    $("#trivia-question-category").text("Category: " + trivia.category)
    $("#trivia-question-number").text("Question #: " + triviaCurrent)
    for (i in answers) {
        var answer = answers[i];
        $(`#trivia-answer-${i}`).html(answer);
    }
    $("#trivia-card").css({ display: "flex" });
    myExit();
}

/**
 * run the main program
 */
$('document').ready(main);
