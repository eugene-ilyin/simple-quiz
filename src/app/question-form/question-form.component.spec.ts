import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleChange } from '@angular/core';
import { QuestionFormComponent } from './question-form.component';
import {IQuestion} from "../interfaces/iquestion";
import {QUESTIONS} from "../data-questions";

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;
  const question: IQuestion = QUESTIONS[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Question form displays answers', () => {
    component.answers = question.answers;
    const compiled = fixture.debugElement.nativeElement;
    // Call ngOnChanges manually, because it cannot be called without host component.
    component.ngOnChanges({
      answers: new SimpleChange(null, component.answers, true)
    });
    fixture.detectChanges();
    // Check that answers are available.
    expect(!!compiled.querySelector('.questions-form input[type=radio]')).toBe(true, 'There are no answers');
  });
});
