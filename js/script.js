const guessedLettersButton = document.querySelector(".guess");
const message = document.querySelector(".message");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessElement = document.querySelector(".remaining");
const guessedLettersElement = document.querySelector(".guessed-letters");
const remainingpGuessesSpan = document.querySelector(".remaining span");
const playAgainButton = document.querySelector(".play-again");
const letterInput = document.querySelector(".letter");

const word = "magnolia";

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
    const guess = letterInput.ariaValueMax;
    console.log(guess);
    letterInput.value = "";
});