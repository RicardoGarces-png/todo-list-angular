import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTodo } from '../interfaces/response';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';
import { Todo } from '../../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly ID_AUTOR = 19;
  private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';
  private readonly ENPOINTADD = 'https://bp-todolist.herokuapp.com/?id_author=19';
  
  


  constructor(
    private http: HttpClient,
    private readonly state: StateService
  ) { }

  getTodoList(): Observable<ResponseTodo> | undefined {
    return this.http.get<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`).pipe(
      tap(
        resp => {
          this.state.setTodoList(resp.data);
        }
      )
    );
  }

  
  addTarea(regNuevo: Todo):Observable<Object>{
    return this.http.post(`${this.ENPOINTADD}?id_author=${this.ID_AUTOR}`, regNuevo);
    
  }

}
