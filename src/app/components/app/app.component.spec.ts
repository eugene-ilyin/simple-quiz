import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {metaReducers, reducers} from '../../store/reducers';
import {select, Store, StoreModule} from '@ngrx/store';
import {filter} from 'rxjs/internal/operators';
import * as fromRoot from '../../store/reducers';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        QuestionFormComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    store = TestBed.get(Store);
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Welcome text is available by default', () => {
    expect(component.showWelcomeText).toBe(true, 'Welcome text is not displayed');
  });

  it('The game can be launched and performed', () => {
    // Check that question will be available.
    component.currentQuestion$.pipe(filter(Boolean)).subscribe((question) => {
      // When the question will be available.
      expect(component.currentAnswerResult).toBeNull('Answer shouldn\'t be available');
      expect(question.qtext).toBeTruthy('Question is not available');
    });
    component.startGame();
    expect(component.showWelcomeText).toBe(false, 'Welcome text is still displayed');

    // Choose an answer.
    component.onSubmitAnswer({answerId: 0});
    store.pipe(
      select(fromRoot.getChosenAnswer),
      filter(Boolean)
    ).subscribe(answer => {
      component.currentAnswerResult = answer.results[0];
      expect(component.currentAnswerResult.rtext).toBeTruthy('Answer is not available');

      // Get scores and ensure that they are applied.
      const prevAnswerResult = answer.results[0],
        prevPlayerMotivation = component.playerMotivation,
        prevPlayerKnowledge = component.playerKnowledge;

      // Get next question.
      component.getNextQuestion();

      // Check calculation of scores.
      expect(component.playerMotivation).toEqual(prevPlayerMotivation + prevAnswerResult.p1, 'Scores calculated incorrectly');
      expect(component.playerKnowledge).toEqual(prevPlayerKnowledge + prevAnswerResult.p2, 'Scores calculated incorrectly');
    });
  });

  it('The game can be launched and finished', () => {
    // Track submitted answer and go to the next question until the end.
    store.pipe(
      select(fromRoot.getChosenAnswer),
      filter(Boolean)
    ).subscribe(answer => {
      component.currentAnswerResult = answer.results[0];
      // Get next question and answer it.
      component.getNextQuestion();
    });

    store.pipe(
      select(fromRoot.getCurrentQuestion),
      filter(Boolean)
    ).subscribe(
      val => {
        // We can simply choose first answer always.
        component.onSubmitAnswer({answerId: 0});
      }
    );

    // Check when user will answer all the questions.
    store.pipe(
      select(fromRoot.isNoMoreQuestions),
      filter(Boolean)
    ).subscribe(() => {
      expect(component.showFinalResult).toEqual(true, 'Game cannot be finished');
    });

    // Start the game and answer first question to launch the process.
    component.startGame();
    component.onSubmitAnswer({answerId: 0});

    // Additional check to be sure that subscription by 'fromRoot.isNoMoreQuestions' have been called.
    setTimeout(() => {
      expect(component.showFinalResult).toEqual(true, 'Game cannot be finished');
    }, 1000);
  });
});
