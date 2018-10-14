import { Action } from '@ngrx/store';
import {assertNumber} from '@angular/core/src/render3/assert';
export const NEXT_QUESTION = 'Next Question';
export const CHOOSE_ANSWER = 'Choose Answer';

export class NextQuestion implements Action {
  readonly type = NEXT_QUESTION;
  constructor() { }
}

export class ChooseAnswer implements Action {
  readonly type = CHOOSE_ANSWER;
  readonly payload = {};
  constructor(answerId: number) {
    this.payload = {answerId: answerId};
  }
}

export type Action = NextQuestion | ChooseAnswer;
