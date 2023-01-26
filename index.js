let startGame = document.querySelector("#start-btn");
let pageStart = document.querySelector(".main-div");
let timer = document.querySelector(".time-left");
let gameResponse = document.querySelector(".message-res");

let initialTime = 60;
let correctAnswered = 0;
let answeredQuestions = 0;

let upcomingQuestion = document.querySelector("#upcoming-question");
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
let countDown = initialTime;
const startTime = () => {
	let timerEl = setInterval(function () {
		countDown--;
		timer.textContent = countDown;
		if (countDown <= 0) {
			clearInterval(timerEl);
			timer.textContent = 0;
		} else {
			stopTimer = () => {
				clearInterval(timerEl);
				countDown += 10;
			};
		}
	}, 1000);
};

const mainCon = () => {
	document.getElementById("main-content").style.display = "none";
	document.getElementById("question-content").style.display = "flex";
	document.getElementById("score-input").style.display = "none";
	document.getElementById("submit-message").style.display = "none";
};

const displayQuestion = ({ question, answers, correctAnswer }) => {
	const titleElement = document.getElementById("question-title");
	titleElement.innerText = question;

	for (const [index, answer] of answers.entries()) {
		let ogAnswerButton = document.querySelector(`#answer-${index + 1}`);
		let answerButton = ogAnswerButton.cloneNode(true);
		ogAnswerButton.parentNode.replaceChild(answerButton, ogAnswerButton);
		answerButton.innerText = answer;

		answerButton.addEventListener("click", (event) => {
			event.preventDefault();
			const answerResponse = document.getElementById("response");
			answerResponse.innerText =
				correctAnswer === answer ? "Correct!" : "Incorrect!";
			if (correctAnswer !== answer) {
				countDown -= 10;
			}

			getNewQuestion();
		});
	}
};

const startQuiz = (event) => {
	event.preventDefault();
	mainCon();

	startTime();
	getNewQuestion();
};
const getNewQuestion = () => {
	// console.log(myQuestions);
	const question = randomQuestion();
	// console.log(myQuestions.length);
	if (question) {
		displayQuestion(question);
	} else {
		document.getElementById("question-content").style.display = "none";

		stopTimer();
		submitScore();
		document.getElementById("submit-message").style.display = "block";
		document.getElementById("score-input").style.display = "block";
	}
};

const randomQuestion = () => {
	const selectedQuestion =
		myQuestions[Math.floor(Math.random() * myQuestions.length)];
	myQuestions = myQuestions.filter((question) => {
		return selectedQuestion.question !== question.question;
	});
	return selectedQuestion;
};
const submitMessage = () => {
	subMessage = document.getElementById("submit-message");
};
const submitScore = () => {
	if (myQuestions.length === 0) {
		submitMyScore = document.getElementById("score-input");
		submitMyScore.textContent = "You're Score:" + " " + countDown;
	}
};

startGame.addEventListener("click", startQuiz);
