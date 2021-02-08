import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = injector.inject(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort posts received', () => {
    const post = {
      id: 1,
      title: 'Blog post #1',
      author: 'Melissa Manges',
      publish_date: '2016-02-23',
      slug: 'blog-post-1',
      description: 'Utroque denique invenire et has.',
      content: '<p>Utroque denique invenire et has.</p>',
    };
    const post2 = {
      id: 8,
      title: 'Blog post #8',
      author: 'Haywood Halfacre',
      publish_date: '2016-09-30',
      slug: 'blog-post-8',
      description:
        'Ea graece animal offendit vel, at pro rebum integre, liber sapientem est te.',
      content:
        '<p>Ea graece animal offendit vel, at pro rebum integre, liber sapientem est te.</p>',
    };

    const req = httpMock.expectOne(`${service.apiURL}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush([post, post2]);
    expect(component.posts).toEqual([post2, post]);
  });
});
