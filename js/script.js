const guessedLettersButton = document.querySelector(".guess");
const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessElement = document.querySelector(".remaining");
const guessedLettersElement = document.querySelector(".guessed-letters");
const remainingpGuessesSpan = document.querySelector(".remaining span");
const playAgainButton = document.querySelector(".play-again");
const letterInput = document.querySelector(".letter");

const word = "magnolia";
const guessedLetters = [];

//Display a placeholder
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessedLettersButton.addEventListener("click", function (e) {
    e.preventDefault();
    //empty the message paragraph
    message.innerText = "";
    //grab the guess entered into the inpu
    const guess = letterInput.value;
    //make sure the input is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
    //we have a letter, so let's guess
    makeGuess (guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    //Input empty
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    //Input more than one letter
    } else if (input.length >1) {
        message.innerText = "Please enter a single letter.";
    //Input not a letter
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    //Input finally a single letter
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes (guess)) {
        message.innerText = "Oh my goodness, you've already guessed that letter.  Try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    };
};
