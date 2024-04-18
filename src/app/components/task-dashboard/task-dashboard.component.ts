import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../commons/store/app.state';
import { isLoggedIn } from '../../commons/store/app.auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  isLoggedIn$ = this.store.pipe(select(isLoggedIn));

  constructor(private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe((loggedIn: boolean) => {
      console.log('Usuario autenticado:', loggedIn);
      if(!loggedIn){
        this.router.navigate(['/login']);
        console.log('redirect a login');
      } else {
        console.log('queda en TaskDashboardComponent');
      }
    });
  }

}
