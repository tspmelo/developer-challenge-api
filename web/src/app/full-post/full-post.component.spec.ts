import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../api.service';
import { FullPostComponent } from './full-post.component';

describe('FullPostComponent', () => {
  let component: FullPostComponent;
  let fixture: ComponentFixture<FullPostComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullPostComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = injector.inject(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set post and comments', () => {
    const post = {
      id: 1,
      title: 'Blog post #1',
      author: 'Melissa Manges',
      publish_date: '2016-02-23',
      slug: 'blog-post-1',
      description: 'Utroque denique invenire et has.',
      content: '<p>Utroque denique invenire et has.</p>',
    };

    let req = httpMock.expectOne(`${service.apiURL}/posts?slug=`);
    expect(req.request.method).toBe('GET');
    req.flush([post]);

    req = httpMock.expectOne(`${service.apiURL}/posts/1/comments`);
    expect(req.request.method).toBe('GET');
    req.flush([]);

    expect(component.notFound).toBeFalsy();
    expect(component.post).toEqual(post);
    expect(component.comments).toEqual([]);
  });

  it('should set NotFound if nothing is returned', () => {
    const req = httpMock.expectOne(`${service.apiURL}/posts?slug=`);
    expect(req.request.method).toBe('GET');
    req.flush(null);

    expect(component.notFound).toBeTruthy();
    expect(component.post).toBeUndefined();
  });
});
