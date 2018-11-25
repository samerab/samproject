import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Action {
  action: string;
  id: string;
  parentId: string;
  data?: any
}

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  actionSubject: Subject<Action> = new Subject<Action>();
  action$ = this.actionSubject.asObservable();

  constructor() { }

  send(action: Action) {
    this.actionSubject.next(action);
  }
}
