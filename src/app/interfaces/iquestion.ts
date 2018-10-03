import {IAnswer} from "./ianswer";

export interface IQuestion {
  qtext: string;
  answers: Array<IAnswer>;
}
