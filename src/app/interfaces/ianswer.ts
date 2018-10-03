import { IAnswerResult } from './ianswer-result';
export interface IAnswer {
  atext: string;
  results: Array<IAnswerResult>;
}
