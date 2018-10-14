import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { QUESTIONS } from '../../../data/data-questions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        QuestionFormComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it("Welcome text shouldn't be empty", () => {
    expect(compiled.querySelector('#welcome-text').textContent.trim().length > 0).toBe(true, 'Welcome text is not displayed');
  });

  it('The game can be launched and performed', () => {
    compiled.querySelector('.welcome-block button').click();
    fixture.detectChanges();
    // Check that question is available.
    expect(component.currentQuestion.qtext.length > 0).toBe(true, 'Question is not displayed');

    // Answer can be chosen and submitted.
    compiled.querySelector('#option0').click();
    fixture.detectChanges();
    compiled.querySelector('.questions-form button').click();
    fixture.detectChanges();
    const answerResult = component.currentAnswerResult;
    expect(!!answerResult).toBe(true, 'Answer result is not available');

    // Answer result is displayed.
    expect(compiled.querySelector('.answer-result .jumbotron').textContent.trim()).toBe(answerResult.rtext, 'Answer result is not displayed');

    // Test final result.
    component.currentQuestionId = QUESTIONS.length - 1;
    compiled.querySelector('#question-result button').click();
    fixture.detectChanges();
    expect(compiled.querySelector('#final-text').textContent.trim().length > 0).toBe(true, 'Final text is not displayed');
  });
});
