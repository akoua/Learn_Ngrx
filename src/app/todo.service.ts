import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Todo } from './todo.model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  //nous allons simuler l'appel à un service Web
  getTodo(): Observable<Todo[]> {
    return timer(2000).pipe(
      tap((x) => console.log(`Tap TodoService ${x} `)),
      map(() => [
        {
          id: '1',
          message: 'http call ',
          done: false
        },
        {
          id: '2',
          message: 'Movie',
          done: false
        }
      ])
    );
  }
}
