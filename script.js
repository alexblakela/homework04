// REFACTORING

// Pull variables
var timer = document.querySelector("#timer");
var btn_start = document.querySelector("#btn_start");
var getCards = document.querySelectorAll(".custom-card");
var resultText = document.querySelector("#resultText");

// Score
var myScore = 0;

// Timer
var minute = 1;
var sec = 59;

// Start with blank slate
localStorage.clear();

// Build Array of Cards
var cardArray = [];
for (var i = 0; i < getCards.length; i++) {
	cardArray.push(getCards[i].id);
}

// Correct Answers
var quizAnswers = ["blank","C","C","D","D","B"];

// Start the Game
$(".btn_start").on("click", startTimer);
$(".btn_start").on("click", function(event) {
	event.preventDefault();
	var currentCard = event.target.parentNode.id;
	var currentIndex = cardArray.indexOf(currentCard);
	hideSeek(currentIndex);
});

// Game Steps
$(".btn_steps").on("click", function(e) {
	e.preventDefault();
	var currentCard = event.target.parentNode.id;
	var currentIndex = cardArray.indexOf(currentCard);

	// Get what was picked

	var pickedCard = document.querySelector('input[name="' + currentCard + '"]:checked').value;
  	console.log(pickedCard);

	localStorage.setItem(currentIndex, pickedCard);

	if (pickedCard == quizAnswers[currentIndex] && pickedCard !== undefined)
	{
		console.log("You got it!");
		myScore++;
	}
	// console.log("You Picked: " + pickedCard);
	console.log("---------------");
	console.log("currentIndex: " + currentIndex);
	console.log("cardArray.length: " + cardArray.length);
	console.log("getCards.length: " + getCards.length);
	console.log("---------------");

	if (e.target.tagName == "BUTTON" && localStorage.getItem(currentIndex)) {
			hideSeek(currentIndex);
	}
	if (localStorage.getItem(currentIndex - 1) !== quizAnswers[currentIndex - 1]) {
			deductTime();
		}	
	if (currentIndex == cardArray.length - 2) {
		console.log ("THE END!");
		showResults();
	}
});

function showResults () {
	resultText.innerHTML = "You've got <strong>" + myScore + "</strong> questions answered correctly";
	timer.classList.add("hide-me");
}

function startTimer () {

	setInterval(function() {
    timer.innerHTML = minute + " : " + ("0" + sec).slice(-2);
    sec--;
    if (sec == 0 && minute == 1) {
      minute --;
      sec = 59;
    }
    if (minute == 0 && sec == 00) {
  		theEnd();
  		showResults();
		}
  }, 1000);
}

function theEnd () {
	for (var i = 0; i < cardArray.length - 1; i++) {
		console.log(getCards[i]);
		getCards[i].classList.add("hide-me");
	}
	getCards[cardArray.length - 1].classList.remove("hide-me");
	timer.classList.add("hide-me");
	alert("Your Time is Up!");
}

function hideSeek (a) {
	var b = a + 1;
	getCards[a].classList.add("hide-me");
	getCards[b].classList.remove("hide-me");
}

function deductTime () {
	// Handle timeout
	if (minute == 0 && sec < 20) {
		theEnd();				
	}

	currentSec = minute * 60 + sec;
	newTime = currentSec - 20;

	if (newTime < 60)
	{
		minute = 0;
		sec = newTime;
	} else {
		minute = 1;
		sec = newTime - 60;
	}

	console.log("newTime " + minute);
	console.log("sec " + sec);
	console.log("currentSec " + currentSec);
	console.log("newTime " + newTime);	
}