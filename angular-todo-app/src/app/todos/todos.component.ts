import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router'
import { NgForm } from '@angular/forms';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { TodoService } from '../../data/services/todo.service';
import { TodoModel } from '../../data/models/todos/todoModel';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {


  todos: TodoModel[];

  id = "tsparticles";

  particlesOptions = {
    background: {
      
      
    },
    fpsLimit: 40,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: {
          enable: true,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 6,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        random: true,
        value: 5
      }
    },
    detectRetina: true
  };

  showValidationErrors: boolean


  constructor(
    private todoservice: TodoService

  )
  {
  }


  ngOnInit(): void {
    this.update()
  }
  onFormSubmit(form: NgForm) {

    if (form.invalid) return this.showValidationErrors = true

    this.todoservice.postTodo(
      {
        name: form.value.text,
        completed: false,
        datacreate: new Date(Date.now()).toISOString(),
        deadline: new Date(Date.now()).toISOString(), categoryId: 4
      }).subscribe(data => this.update())
    this.showValidationErrors=false
    form.reset()

  }
  update() {
    this.todoservice.getTodo().subscribe(data => {
      console.log(data)
      this.todos = (data as TodoModel[]).sort((a, b) =>
       new Date(a.datacreate).getTime() > new Date(b.datacreate).getTime() ?1:-1
        );
    })

    
  }
  toggleCompleted(todo: TodoModel) {
    todo.completed = !todo.completed;
    this.todoservice.putTodo(todo).subscribe(data => this.update());
  }

  editTodo(todo: TodoModel) {
    //we need
    //index todo
    const index = this.todos.indexOf(todo)
    //this.dataService.updateTodo()
  }
  deleteTodo(todo: TodoModel) {
    console.log(todo)
    this.todoservice.deleteTodo(todo).subscribe(data => this.update())
    
  }
}





