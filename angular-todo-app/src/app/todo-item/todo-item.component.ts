import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoModel } from '../../data/models/todos/todoModel';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoModel
  @Output() todoClicked: EventEmitter<void> = new EventEmitter()
  @Output() editClicked: EventEmitter<void> = new EventEmitter()
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter()



  constructor() { }

  ngOnInit(): void {
  }

  onTodoClicked() {
    this.todoClicked.emit()
  }
  oneEditClicked() {
    this.editClicked.emit()
  }
  oneDeleteClicked() {
    console.log("todoItem")
    this.deleteClicked.emit()
  }

}
