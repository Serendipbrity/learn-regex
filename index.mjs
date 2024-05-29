import readline from 'readline';
import chalk from 'chalk';
import fs from 'fs';
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentQuestion = 0;
let score = 0;

function playGame() {

  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    console.log(`Question ${currentQuestion + 1}`);
    console.log(`Question: ${question.description}`);
    rl.question('Enter your regex: ', (answer) => {
      try {
        // const userRegex = new RegExp(answer);
        if (question.regex===answer) {
          console.log(chalk.green('Correct!'));
          currentQuestion++;
          score++;
          playGame();
        } else {
          console.log(chalk.red('Incorrect, try again.'));
          playGame();
        }
      } catch (e) {
        console.log(chalk.red('Invalid regex, try again.'));
        playGame();
      }
    });
  } else {
    console.log(chalk.magenta('Congratulations, you completed all questions!'));
    console.log(chalk.magenta(`Score: ${score} / ${questions.length}`));
    rl.close();
  }
}

playGame();
