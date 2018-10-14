import { Action } from '@ngrx/store';
import { IQuestion } from '../../interfaces/iquestion';
import { QUESTIONS } from '../../../data/data-questions';
import * as questionsAction from '../actions/questions';
import {IAnswer} from '../../interfaces/ianswer';
import {P} from '@angular/core/src/render3';

export interface State {
  currentQuestionId: number;
  currentQuestion: IQuestion;
  chosenAnswer: IAnswer;
  questions: IQuestion[];
  noMoreQuestions: boolean;
}

export const initialState: State = {
  currentQuestionId: null,
  currentQuestion: null,
  chosenAnswer: null,
  questions: QUESTIONS,
  noMoreQuestions: false
};

export function reducer(state = initialState, action: questionsAction.Action) {
  switch (action.type) {
    case questionsAction.NEXT_QUESTION: {
      const nextId = state.currentQuestionId === null ? 0 : state.currentQuestionId + 1;
      // We have a next question.
      if (state.questions[nextId]) {
        return {
          ...state,
          currentQuestionId: nextId,
          currentQuestion: state.questions[nextId],
          chosenAnswer: null
        };
        //  No more questions.
      } else {
        return {
          ...state,
          chosenAnswer: null,
          currentQuestionId: null,
          currentQuestion: null,
          noMoreQuestions: true
        };
      }
    }
    case questionsAction.CHOOSE_ANSWER: {
      return {
        ...state,
        chosenAnswer: state.currentQuestion.answers[action.payload['answerId']]
      };
    }
    default:
      return state;
  }
}

export const getCurrentQuestion = (state: State) => state.currentQuestion;
export const getChosenAnswer = (state: State) => state.chosenAnswer;
export const isNoMoreQuestions = (state: State) => state.noMoreQuestions;
