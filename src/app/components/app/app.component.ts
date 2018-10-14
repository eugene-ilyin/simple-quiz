import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import { QUESTIONS } from '../../../data/data-questions';
import { IQuestion } from '../../interfaces/iquestion';
import { IAnswerResult } from '../../interfaces/ianswer-result';

import * as fromRoot from '../../store/reducers';
import * as questionsAction from '../../store/actions/questions';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {

  questions = QUESTIONS;

  currentQuestion$: Observable<IQuestion>;
  currentAnswerResult: IAnswerResult;

  playerMotivation: number;
  playerKnowledge: number;

  showFinalResult = false;

  private _subs = [];

  constructor(private store: Store<fromRoot.State>) {
    this.currentQuestion$ = store.pipe(select(fromRoot.getCurrentQuestion));

    // Hide the question result each time when we move to the next question.
    this._subs.push(
      this.currentQuestion$.subscribe(question => {
        this.currentAnswerResult = null;
      })
    );

    // Handle chosen answer.
    this._subs.push(
      store.pipe(
        select(fromRoot.getChosenAnswer),
        filter(Boolean)
      ).subscribe(answer => {
        // Only one possible result, just take it.
        if (answer.results.length === 1) {
          this.currentAnswerResult = answer.results[0];
        // Several possible results.
        } else if (answer.results.length > 1) {
          // Get percent.
          const percent = this._getRandomInt(1, 100);

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
      })
    );

    // Check when user will answer all the questions.
    this._subs.push(
      store.pipe(
        select(fromRoot.isNoMoreQuestions),
        filter(Boolean)
      ).subscribe(() => {
        this.showFinalResult = true;
      })
    );
  }

  startGame(): void {
    this.store.dispatch(new questionsAction.NextQuestion());
    this.playerMotivation = 100;
    this.playerKnowledge = 0;
  }

  // Track submit of the question form.
  onSubmitAnswer = data => {
    this.store.dispatch(new questionsAction.ChooseAnswer(data.answerId));
  }

  // Moves player to the next question.
  getNextQuestion(): void {
    // Update scores.
    this.playerMotivation += this.currentAnswerResult.p1;
    this.playerKnowledge += this.currentAnswerResult.p2;

    // Move to the next question.
    this.store.dispatch(new questionsAction.NextQuestion());
  }

  // Restarts the game.
  restartGame(): void {
    this.showFinalResult = false;
  }

  _getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Format score before to show it to a user.
  _formatScore(score): string {
    if (score >= 0) {
      return '+' + score;
    } else {
      return score;
    }
  }

  ngOnDestroy() {
    this._subs.forEach(item => item.unsubscribe());
  }
}
