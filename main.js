'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
solution = 'abcd';

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) => {
  // your code here
  let solutionArray = solution.split('')
  let guessArray = guess.split('')
  let correctLetterLocations = 0
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++
      solutionArray[i] = 0
      guessArray[i] = 1
    }
  }
  let letterWrongSpot = 0
  for (let i = 0; i < 4; i++) {
    for (let ii = 0; ii < 4; ii++) {
      if (guessArray[i] === solutionArray[ii]) {
        letterWrongSpot++
        solutionArray[ii] = 0
        guessArray[i] = 1
      }
    }
  }
  return correctLetterLocations + '-' + letterWrongSpot
}
const mastermind = (guess) => {
   // Comment this out to generate a random solution
  // your code here

  if (guess === solution) {
    return 'You guessed it!'
  } else {
    board.push(guess)
    generateHint(guess)
  }
  if(board.length == 10) {
    return "you lose!"
  }
}



const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}

