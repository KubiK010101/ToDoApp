import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { Data } from '@angular/router'
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {


  todos: Todo[];

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


  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }
  onFormSubmit(form: NgForm) {

    if (form.invalid) return this.showValidationErrors = true

    this.dataService.addTodo(new Todo(form.value.text))

    this.showValidationErrors=false
    form.reset()

  }
  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }
  editTodo(todo: Todo) {
    //we need
    //index todo
    const index = this.todos.indexOf(todo)
    //this.dataService.updateTodo()
  }
}





