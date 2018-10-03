import { Component } from '@angular/core';
import { QUESTIONS } from "./data-questions";
import {IQuestion} from "./interfaces/iquestion";
import {IAnswerResult} from "./interfaces/ianswer-result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions = QUESTIONS;
  currentQuestionId: number;
  currentQuestion: IQuestion;
  currentAnswerResult: IAnswerResult;
  showQuestionResult: boolean = false;
  playerMotivation: number = 100;
  playerKnowledge: number = 0;
  showFinalResult: boolean = false;

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  startGame = () => {
    this.currentQuestionId = 0;
    this.currentQuestion = this.questions[this.currentQuestionId];
  };

  // Track submit of the question form.
  onSubmitAnswer = data => {
    const answer = this.questions[this.currentQuestionId].answers[data.answerId];

    // Only one possible result, just take it.
    if (answer.results.length === 1) {
      this.currentAnswerResult = answer.results[0];
    // Several possible results.
    } else if (answer.results.length > 1) {
      // Get percent.
      const percent = this.getRandomInt(1, 100);

      let passedChance = 0,
        currentChance;
      for (let i = 0; i < answer.results.length; i++) {
        currentChance = answer.results[i].chance;
        // If percent is not correspond to previous option but correspond to current option.
        if (percent <= (passedChance + currentChance)
          && percent > passedChance) {
          this.currentAnswerResult = answer.results[i];
          break;
        }

        // Pass the checked space of chances.
        passedChance += currentChance;
      }
    }

    // If we have a result of question.
    if (!!this.currentAnswerResult['rtext']) {
      this.showQuestionResult = true;
    }
  };

  // Moves player to the next question.
  getNextQuestion = () => {
    // Update scores.
    this.playerMotivation += this.currentAnswerResult.p1;
    this.playerKnowledge += this.currentAnswerResult.p2;

    // Move to the next question.
    this.currentQuestionId++;
    this.currentQuestion = this.questions[this.currentQuestionId];
    this.showQuestionResult = false;
    // Reset current answer.
    this.currentAnswerResult = {rtext: '', p1: 0, p2: 0};
    // If there are no questions more, then show final result.
    if (!this.currentQuestion) {
      this.showFinalResult = true;
    }
  };

  // Format score before to show it to a user.
  formatScore = (score) => {
    if (score >= 0) {
      return '+' + score;
    } else {
      return score;
    }
  };

  // Restarts the game.
  restartGame = () => {
    this.currentQuestionId = undefined;
    this.showFinalResult = false;
  }
}
