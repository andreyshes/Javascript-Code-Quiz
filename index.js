//grabbing all the elements from the html file

let startGame = document.querySelector("#start-btn");
let pageStart = document.querySelector(".main-div");
let timer = document.querySelector(".time-left");
let gameResponse = document.querySelector(".message-res");

let initialTime = 60;
let correctAnswered = 0;
let answeredQuestions = 0;

let upcomingQuestion = document.querySelector("#upcoming-question");
let questionOpt = document.querySelector(".ques-options");

let correctNumAnswered = document.querySelector(".correct-answers");

let viewHighScores = document.querySelector(".high-scores");
let savedScore = document.querySelector(".saved-score");
let responseOne = document.querySelector(".res-1");
//created an array of questions to be asked
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

//created a timer function that starts and stops from initial time
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
//a function that gets rid of all the context on load out and dispalys questions
const mainCon = () => {
	document.getElementById("main-content").style.display = "none";
	document.getElementById("question-content").style.display = "flex";
	document.getElementById("score-input").style.display = "none";
	document.getElementById("submit-message").style.display = "none";
};
//funnction that grabs index from given array to display question
const displayQuestion = ({ question, answers, correctAnswer }) => {
	const titleElement = document.getElementById("question-title");
	//setting the titleElement(our questions) to equal our question from the array
	titleElement.innerText = question;
		//for loop that loops through the questions, answers, and correct anwsers
	for (const [index, answer] of answers.entries()) {
		let ogAnswerButton = document.querySelector(`#answer-${index + 1}`);
		//gets rid of the event lisenters that were called to many times
		let answerButton = ogAnswerButton.cloneNode(true);
		ogAnswerButton.parentNode.replaceChild(answerButton, ogAnswerButton);
		answerButton.innerText = answer;
		
		//event listener to see whether the answer chosen is correct or incorrect
		answerButton.addEventListener("click", (event) => {
			event.preventDefault();
			const answerResponse = document.getElementById("response");
			answerResponse.innerText =
				correctAnswer === answer ? "Correct!" : "Incorrect!";
			if (correctAnswer !== answer) {
				countDown -= 10;
			}
			//calling the getNewQuestion function to grab a new question after given question was answered
			getNewQuestion();
		});
	}
};
//function when called will run these other functions below when quiz starts
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

const submitScore = () => {
	if (myQuestions.length === 0) {
		submitMyScore = document.getElementById("score-input");
		submitMyScore.textContent = "You're Score:" + " " + countDown;
		document.getElementById("submit-message").style.display = "block";
		let initials = document.getElementById("initials").value;
		localStorage.setItem("initials", initials);
		localStorage.setItem("score", countDown);
	}
};
const displayScore = () => {
	let initials = localStorage.getItem("initials");
	console.log(initials);
	if (initials) {
		console.log(initials + " " + countDown);
		responseOne.textContent = initials + " " + countDown;
		responseOne.style.display = "block";
	}
};

startGame.addEventListener("click", startQuiz);
