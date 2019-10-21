let modalTestItem = document.getElementsByClassName("modal-test-item")[0];
let mainContainer = document.getElementsByClassName("main-container")[0];
let testQuestionBlock = document.getElementsByClassName("test-question-block")[0];
let testHeader = document.getElementById("question-header");
let testBody = document.getElementById("question-body");
let testCategories = document.getElementById("test-categories");
let nextQuestionButton = document.getElementById("next-question");
let finishTestButton = document.getElementById("finish-test");
let testsContainer = document.getElementById("test-list-container");
let currentTest;

let questionCounter = 0;

let categories = [
	"movies",
	"psychhology",
	"mind",
	"logic",
	"science",
	"food"
]

let tests = [
	{
		id: 1,
		name: "Personality test",
		questions: [{
			question: "You’re waiting in a long line:",
			options: ["You chat with the person next to you.", "You keep your eyes on your phone."],
			correctAnswer: ["1"]
		},
		{
			question: "Roommates:",
			options: ["It is great to have someone there when you get home.", "You’d much rather live by yourself."],
			correctAnswer: ["2"]
		},
		{
			question: "You’re going on a day trip to the mountains.",
			options: ["You plan out where to go and what to do.", "You just get in the car and go!"],
			correctAnswer: ["1"]
		}]
	},
	{
		id: 2,
		name: "SHA",
		questions: [{
			question: "Are you man?",
			options: ["Yes", "No"],
			correctAnswer: ["1"]
		},
		{
			question: "Roommates:",
			options: ["It is great to have someone there when you get home.", "You’d much rather live by yourself."],
			correctAnswer: ["2"]
		},
		{
			question: "You’re going on a day trip to the mountains.",
			options: ["You plan out where to go and what to do.", "You just get in the car and go!"],
			correctAnswer: ["1"]
		}]
	}
]

function expandTestItemModal(element) {
	modalTestItem.style.display = "block";

	setCurrentTest(element.target.getAttribute("data-test-id"));
}

function setCurrentTest(testId) {
	currentTest = tests.find(x => x.id == testId);
}

function closeTestItemModal() {
	modalTestItem.style.display = "none";
}

function startTest() {
	mainContainer.style.display = "none";
	modalTestItem.style.display = "none";
	testQuestionBlock.style.display = "block";

	nextQuestion();
}

function isEnterAnswerForQuestion() {
	radioButtons = document.getElementsByClassName("test-item-radio");
	for (i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].checked)
			return true;
	}

	alert("You can't go to next step until data isn't entered");
	return false;
}


function nextQuestion() {
	if (questionCounter != 0 && !isEnterAnswerForQuestion()) {
		return;
	}
	clearQuestionBlock();
	if (questionCounter === currentTest.questions.length - 1) {
		nextQuestionButton.style.display = "none";
		finishTestButton.style.display = "block";
	}
	else {
		finishTestButton.style.display = "none";
		nextQuestionButton.style.display = "block";
	}

	if (questionCounter == 0 || questionCounter < currentTest.questions.length) {
		testHeader.innerHTML = currentTest.questions[questionCounter].question;
		for (let i = 0; i < currentTest.questions[questionCounter].options.length; i++)
			addListOptionIntoQuestion(currentTest.questions[questionCounter].options[i]);
	}

	questionCounter++;
}

function finishTest() {
	if (!isEnterAnswerForQuestion()) {
		return;
	}
	testQuestionBlock.style.display = "none";
	mainContainer.style.display = "block";
	questionCounter = 0;
	alert("Cool!");
}

function clearQuestionBlock() {
	while (testBody.firstChild) {
		testBody.removeChild(testBody.firstChild);
	}
}

function addListOptionIntoQuestion(option) {
	let div = document.createElement("div");
	let radioInput = document.createElement("input");
	let radioLabel = document.createElement("label");
	div.className = "form-check";
	radioInput.className = "form-check-input"
	radioInput.setAttribute("id", `radio-option-${option}`);
	radioInput.setAttribute("type", "radio");
	radioInput.classList.add("test-item-radio", "mr-3");
	radioLabel.setAttribute("for", `radio-option-${option}`);
	radioLabel.className = "form-check-label";
	div.appendChild(radioInput);
	div.appendChild(radioLabel);
	radioLabel.appendChild(document.createTextNode(option));
	testBody.appendChild(div);
}

window.onclick = function (event) {
	if (event.target == modalTestItem) {
		modalTestItem.style.display = "none";
	}
}

function setCategoriesToFilterTests() {
	for (let i = 0; i < categories.length; i++) {
		let option = document.createElement("option");
		option.innerHTML = categories[i];
		testCategories.appendChild(option);
	}
}

function generateTest(test) {
	let div = document.createElement("div");
	let cardBody = document.createElement("div");
	let span = document.createElement("span");
	div.classList.add("card", "border-0", "my-2", "test-item", "col-5");
	div.addEventListener("click", expandTestItemModal);
	cardBody.setAttribute("data-test-id", test.id);
	cardBody.classList.add("card-body", "p-3");
	span.className = "lead";
	span.innerHTML = test.name;
	cardBody.appendChild(span);
	div.appendChild(cardBody);
	testsContainer.appendChild(div);
}

function loadTests() {
	for (let i = 0; i < tests.length; i++) {
		generateTest(tests[i]);
	}
}

window.onload = function () {
	setCategoriesToFilterTests();
	loadTests();
}