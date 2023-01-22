let startGame = document.querySelector("#start-btn");
let pageStart = document.querySelector(".main-div");
let timer = document.querySelector(".time-left");
let gameResponse = document.querySelector(".message-res");

let initialTime = 60;
let correctAnswered = 0;
let answeredQuestions = 0;

let currentChoice;

let questionsLabels = document.querySelector("question-label");
let answer1 = document.querySelector(".op-1");
let answer2 = document.querySelector(".op-2");
let answer3 = document.querySelector(".op-3");
let answer4 = document.querySelector(".op-4");

let upcoomingQuestion = document.querySelector(".upcoming-question");
let questionOpt = document.querySelector(".ques-options");
let correctRes = document.querySelector(".res-2");
let incorrectRes = document.querySelector(".res-3");

let correctNumAnswered = document.querySelector(".correct-answers");
let initials = document.querySelector("#int-input");
let submitIntitals = document.querySelector("#sub-int");

let viewHighScores = document.querySelector(".high-scores");
let savedScore = document.querySelector(".saved-score");

let myQuestions = [
	{
		question: "What is the value of a boolean? ",
		answers: ["string", "number", "array", "true and false"],
		correctAnswer: "true and false",
	},
	{
		question: "Which of the options below doesn’t allow to change its value?",
		answers: ["const", "var", "let", "none of the above"],
		correctAnswer: "const",
	},
	{
		question: "In what year was ES6 released?",
		answers: ["1999", "2002", "2019", "2015"],
		correctAnswer: "2015",
	},
	{
		question: "Which of these is a not a logical operator?",
		answers: ["&&", "||", "$$", "!"],
		correctAnswer: "$$",
	},
	{
		question: "What is the most common coding language?",
		answers: ["python", "ruby", "javascript", "C++"],
		correctAnswer: "javascript",
	},
];
timer.textContent = 0;
startTime = () => {
	countDown = initialTime;
	let timerEl = setInterval(function () {
		countDown--;
		timer.textContent = countDown;
		if (countDown <= 0) {
			clearInterval(timer);
			timer.textContent = 0;
		} else if (answeredQuestions > 5) {
			clearInterval(timeEl);
			timer.textContent = 0;
		}
	}, 1000);
};

startQuiz = (event) => {
	event.preventDefault();
	startTime();
};

startGame.addEventListener("click", startQuiz);
