const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLettersButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingpGuessesSpan = document.querySelector(".remaining span");
const playAgainButton = document.querySelector(".play-again");
const message = document.querySelector(".message");


let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = word.split("/n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//Display a placeholder
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
       // console.log(letter);
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
    };
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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress (guessedLetters);
    }
};

const showGuessedLetters = function () {
    //clear the list first
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement ("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper= word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes (letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)) {
        //bad guess, lost a chance
        message.innerText = `Sorry, the word has no ${guess}!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    

    if(remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class ="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingpGuessesSpan.innerText=`${remainingGuesses} guess`;
    } else {
        remainingpGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML= `<p class ="highlight">Congrats! You guessed the correct word!</p>`;
    }
};


