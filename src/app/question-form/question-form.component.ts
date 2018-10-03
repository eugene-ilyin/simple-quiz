import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {IAnswer} from "../interfaces/ianswer";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
})
export class QuestionFormComponent implements OnChanges {
  @Input() answers: Array<IAnswer>;
  @Output() submittedData = new EventEmitter<object>();

  currentAnswers: Array<string> = [];

  questionForm: FormGroup = new FormGroup({
    answerId: new FormControl('')
  });

  constructor() { }

  ngOnChanges (changes: SimpleChanges) {
    // Refresh possible answers in the form.
    if (changes.answers && changes.answers.currentValue) {
      this.currentAnswers = changes.answers.currentValue.map(item => item.atext);
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
