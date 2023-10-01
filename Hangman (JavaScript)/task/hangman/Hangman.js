const input = require('sync-input');
const Modes = require("./Modes")

const words = ["python", "java", "swift", "javascript"];

class Hangman {
    attempts = 0;
    originalWord;
    word
    process
    regex;

    lowerLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    guessedLetters = [];

    statistics = {
        wins: 0,
        loses: 0
    }

    start() {
        console.log("H A N G M A N");
        while (true) {
            const mode = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
            if (mode === Modes.play) {
                console.log();
                this.play();
            } else if (mode === Modes.results) {
                console.log(`You won: ${this.statistics.wins} times.`);
                console.log(`You lost: ${this.statistics.loses} times.`)
            } else if (mode === Modes.exit) {
                break;
            } else {}
        }
    }


    play() {

        this.chooseRandomWord();
        while (true) {

            const result = this.guess();
            if (result) {
                console.log(`You guessed the word ${this.originalWord}!`);
                console.log("You survived!");
                this.statistics.wins++;
                break;
            }
            if (this.attempts === 8) {
                console.log("You lost!");
                this.statistics.loses++;
                break
            }
        }
        this.guessedLetters = [];
    }

    guess() {
        let userInput = "";

        while (true) {
            console.log(this.process.join(""));
            userInput = input("Input a letter: ");
            const longerThanOne = userInput.length > 1;
            const isNotLowerLetter = !this.lowerLetters.includes(userInput);
            const isEmpty = userInput === "";
            if (longerThanOne || isEmpty) {
                console.log("Please, input a single letter.\n");
            } else if (isNotLowerLetter) {
                console.log("Please, enter a lowercase letter from the English alphabet.\n")
            }

            const isLowerLetter =  this.lowerLetters.includes(userInput);
            if (userInput.length === 1 && isLowerLetter && !(userInput === "")) {
                if (this.guessedLetters.includes(userInput)) {
                    console.log("You've already guessed this letter.\n")
                    continue
                }
                break
            }
        }
        this.guessedLetters.push(userInput);
        this.regex = new RegExp(userInput, "i");
        if (!this.regex.test(this.word)){
            if (!this.regex.test(this.process.join(""))) {
                console.log("That letter doesn't appear in the word.\n");
                this.attempts++;
                return
            }
            console.log("No improvements.")
            this.attempts++;
            return;
        }
        let result = false;
        console.log();
        while (this.regex.test(this.word)) {
            const index = this.word.indexOf(userInput);
                this.process[index] = this.word[index];

                let newWord = this.word.split("");
                newWord[index] = "*";
                this.word = newWord.join("");
                if (this.process.join("") === this.originalWord) {
                    result = true;
                    break;
                }
            }
            return result;

    }



    chooseRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        this.word = words[randomIndex];
        this.originalWord = words[randomIndex];
        this.process = "-".repeat(this.word.length).split("");
    }
}

module.exports = Hangman;