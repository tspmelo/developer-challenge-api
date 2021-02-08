import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  const post = {
    id: 7,
    title: 'Blog post #7',
    author: 'Shari Stampley',
    publish_date: '2016-09-29',
    slug: 'blog-post-7',
    description: 'Diceret appetere pro ne, corpora neglegentur per at.',
    content: '<p>Diceret appetere pro ne, corpora neglegentur per at. ',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
