import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../commons/store/app.state';
import { getUsername, isLoggedIn } from '../../commons/store/app.auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  username = this.store.pipe(select(getUsername));

  newTask: string = '';
  tasks: Task[] = [];
  showTask: boolean = false;

  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe((loggedIn: boolean) => {
      if(!loggedIn){
        this.router.navigate(['/login']);
      } else {
        this.validateTaskList()
      }
    });
  }

  validateTaskList(){
    if(this.tasks.length === 0){
      this.showTask = false;
    } else {
      this.showTask = true;
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      if (this.tasks.find(task => task.name === this.newTask.trim())) {
        this.showErrorMessage = true;
        this.errorMessage = 'Esta Tarea ya existe';
      } else {
        this.tasks.push({ name: this.newTask.trim(), completed: false });
        this.newTask = '';
        this.showTask = true;
        this.showErrorMessage = false;
        this.errorMessage = '';
      }
    }
  }
  

  // addTask() {
  //   if (this.newTask.trim() !== '') {
  //     this.tasks.push({ name: this.newTask, completed: false });
  //     this.newTask = '';
  //     this.showTask = true;
  //   }
  // }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      if (this.tasks.length === 0) {
        this.showTask = false;
      }
    }
  }  

}

interface Task {
  name: string;
  completed: boolean;
}