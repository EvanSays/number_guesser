var userInput = document.getElementById('input-guess');
var guessButton = document.getElementById('button-guess');
var clearButton = document.getElementById('button-clear');
var resetButton = document.getElementById('button-reset');
var userResultText = document.getElementById('user-results');
var lastGuessNum = document.getElementById('last-guess-num');
var lastGuessText = document.getElementById('last-guess-text');
var randomNumber;


/*=======================================
>>>>>>>>  Event Listeners  <<<<<<<<
========================================*/


clearButton.addEventListener('click', function() {
	clearInput();
	buttonDisabled(guessButton);
	buttonDisabled(clearButton);
});

resetButton.addEventListener('click', function() {
	buttonDisabled(resetButton)
	onLoad();

});

guessButton.addEventListener('click', function() {
	guessBoxCheck();
	clearInput();
	buttonDisabled(guessButton);
	buttonDisabled(clearButton);
	buttonEnabled(resetButton);
});

userInput.addEventListener('focus', function() {
	buttonEnabled(guessButton);
	buttonEnabled(clearButton);
	buttonDisabled(resetButton);
});


/*=======================================
>>>>>>>>  Functions  <<<<<<<<
========================================*/

function onLoad() {
	getRandomNumber();
	userResultText.innerText = 'Welcome';
	lastGuessNum.innerText = '0';
}

function getRandomNumber() {
	randomNumber = Math.floor(Math.random() * 100);
}

function clearInput() {
	userInput.value = '';
}

function guessBoxCheck() {
	var numLength = userInput.value.length;
	if (numLength > 0) {
		evaluateGuess();
	} else {
		lastGuessText.innerText = 'No input';
		lastGuessNum.innerText = ':-(';
		userResultText.innerText = 'Please try again';
	}
}

function evaluateGuess() {
	var notNum = nanCheck();
	if (notNum == false) {
		var inRange = boundsCheck();
		if (inRange == true) {
			matchCheck();
		}
	}
}

function nanCheck() {
	var guessNum = userInput.value;
	if (isNaN(parseInt(guessNum)) == true) {
		userResultText.innerText = "That is not a number!";
		lastGuessText.innerText = "Error";
		lastGuessNum.innerText = 'X';
	} else {
		return false;
	}
}

function boundsCheck() {
	var guessNum = userInput.value;
	if (guessNum > 100) {
		lastGuessNum.innerText = 'X';
		lastGuessText.innerText = "Out of bounds";
		userResultText.innerText = "Decrease your number";
	} else if (guessNum < 0) {
		lastGuessNum.innerText = 'X';
		lastGuessText.innerText = "Out of bounds";
		userResultText.innerText = "Increase your number";
	} else {
		lastGuessText.innerText = "Your last guess was";
		return true;
	}
}

function matchCheck() {
	var guessNum = userInput.value;
	if (guessNum > randomNumber) {
		userResultText.innerText = "Guess is too high";
		lastGuessNum.innerText = guessNum;
		clearInput();
	} else if (guessNum < randomNumber) {
		userResultText.innerText = "Guess is too low";
		lastGuessNum.innerText = guessNum;
		clearInput();
	} else if (guessNum == randomNumber) {
		lastGuessNum.innerText = ':-)';
		userResultText.innerText = "Guess was correct";
		userResultText.innerText = "BOOM!";
		clearInput();
	} else if (guessNum > 100 || guessNum < 0) {
		lastGuessText.innerText = "Number out of bounds";
	}
}

function buttonEnabled(buttonName) {
	buttonName.classList.add('enable')
	buttonName.classList.remove("disable")
	buttonName.removeAttribute("disabled")
}

function buttonDisabled(buttonName) {
	buttonName.classList.add('disable')
	buttonName.classList.remove("enable")
}
