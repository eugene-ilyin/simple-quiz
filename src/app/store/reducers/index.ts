import { ActionReducerMap, createSelector, createFeatureSelector,
  ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromQuestions from './questions';

export interface State {
  questions: fromQuestions.State;
}
export const reducers: ActionReducerMap<State> = {
  questions: fromQuestions.reducer
};
export function logger(reducer: ActionReducer<State>):
  ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = [logger];

export const getQuestionsState = createFeatureSelector<fromQuestions.State>('questions');

export const getCurrentQuestion = createSelector(
  getQuestionsState,
  fromQuestions.getCurrentQuestion,
);

export const getStepInfo = createSelector(
  getQuestionsState,
  fromQuestions.getStepInfo,
);

export const getChosenAnswer = createSelector(
  getQuestionsState,
  fromQuestions.getChosenAnswer,
);

export const isNoMoreQuestions = createSelector(
  getQuestionsState,
  fromQuestions.isNoMoreQuestions
);
