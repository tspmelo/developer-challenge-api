import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private replyDataSource = new BehaviorSubject<number | undefined>(undefined);
  public replyData$ = this.replyDataSource.asObservable();

  constructor() {}

  update(reply: number | undefined): void {
    this.replyDataSource.next(reply);
  }
}
