import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Todo } from '../../app/shared/todo.model';
import { Constants } from '../constants';
import { TodoModel } from '../models/todos/todoModel';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly url: string = Constants.URL + "api/todos/"
  private httpclient: HttpClient
  constructor(httpclient: HttpClient) {
    this.httpclient = httpclient;
  }
  deleteTodo(todo: TodoModel) {
   return this.httpclient.delete(this.url + todo.id)
      
  }
  putTodo(todo: TodoModel) {
   return this.httpclient.put(this.url + todo.id, todo)
      
  }
  postTodo(todo: TodoModel) {
    return  this.httpclient.post(this.url, todo)
     
  }
  getTodo() {
    return  this.httpclient.get(this.url)
       
  }
}
