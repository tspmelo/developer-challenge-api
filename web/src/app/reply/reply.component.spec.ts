import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ReplyComponent } from './reply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplyComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = injector.inject(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if any empty', () => {
    expect(component.form.valid).toBeFalsy();

    component.form.patchValue({ name: 'foo' });
    expect(component.form.valid).toBeFalsy();

    component.form.patchValue({ name: '', content: 'bar' });
    expect(component.form.valid).toBeFalsy();

    component.form.patchValue({ name: 'foo', content: 'bar' });
    expect(component.form.valid).toBeTruthy();
  });

  it('should submit only when form is valid', () => {
    expect(component.form.valid).toBeFalsy();
    component.submit();
    httpMock.expectNone(`${service.apiURL}/posts/undefined/comments`);

    component.form.patchValue({ name: 'foo', content: 'bar' });
    expect(component.form.valid).toBeTruthy();
    component.submit();

    const req = httpMock.expectOne(`${service.apiURL}/posts/undefined/comments`);
    expect(req.request.method).toBe('POST');
  });
});
