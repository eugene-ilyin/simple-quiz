import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {IQuestion} from '../../interfaces/iquestion';
import {IAnswer} from '../../interfaces/ianswer';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
})
export class QuestionFormComponent implements OnChanges {
  @Input() question: IQuestion;
  // @todo define a special type for steps.
  @Input() stepInfo: any;
  @Output() submittedData = new EventEmitter<object>();

  questionText = '';
  answersList: IAnswer[] = [];

  questionForm: FormGroup = new FormGroup({
    answerId: new FormControl('')
  });

  constructor() { }

  ngOnChanges (changes: SimpleChanges) {
    // Refresh possible answers in the form.
    if (changes.question && changes.question.currentValue) {
      this.answersList = changes.question.currentValue.answers.map(item => item.atext);
      this.questionText = changes.question.currentValue.qtext;
    }
  }

  onSubmit() {
    // Notify a parent component that form was submitted.
    this.submittedData.emit(this.questionForm.getRawValue());
  }

  // Click on the radio button when user clicks on it's div wrapper.
  clickLine = (targetWrapper) => {
    const inputElem = targetWrapper.getElementsByTagName('input');
    if (inputElem[0]) {
      inputElem[0].click();
    }
  }
}
