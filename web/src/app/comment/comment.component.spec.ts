import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { StateService } from '../state.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let injector: TestBed;
  let service: StateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
    }).compileComponents();

    injector = getTestBed();
    service = injector.inject(StateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      id: 1,
      postId: 1,
      parent_id: null,
      user: 'Amelia',
      date: '2016-02-23',
      content:
        'Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor.',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update reply value', () => {
    expect(component.reply).toBeUndefined();
    service.update(2);
    expect(component.reply).toBe(2);
  });
});
