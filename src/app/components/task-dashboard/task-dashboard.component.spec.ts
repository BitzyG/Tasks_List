import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskDashboardComponent } from './task-dashboard.component';
import { StoreModule, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { isLoggedIn } from '../../commons/store/app.auth.selectors';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;
  let store: MockStore;
  const initialState = { loggedIn: false, username: null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDashboardComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Fn ngOnInit - should navigate to login page if user is not logged in', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    store.overrideSelector(isLoggedIn, false);

    component.ngOnInit();

    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('Fn validateTaskList - set showTask to false if tasks array is empty', () => {
    component.tasks = [];
    component.validateTaskList();
    expect(component.showTask).toBeFalsy();
  });

  it('Fn validateTaskList - set showTask to true if tasks array is not empty', () => {
    component.tasks = [{ name: 'Task 1', completed: false }];
    component.validateTaskList();
    expect(component.showTask).toBeTruthy();
  });

  it('Fn deleteTask - if tasks array becomes empty', () => {
    const task = { name: 'Task 1', completed: false };
    component.tasks = [task];

    component.deleteTask(task);

    expect(component.tasks.length).toBe(0);
    expect(component.showTask).toBeFalsy();
  });

  it('Fn deleteTask - if tasks array remains non-empty', () => {
    const task1 = { name: 'Task 1', completed: false };
    const task2 = { name: 'Task 2', completed: false };
    component.tasks = [task1, task2];

    component.deleteTask(task1);

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].name).toBe(task2.name);
  });

  it('Fn addTask - should add a task to the list if it does not already exist', () => {
    component.newTask = 'New Task';
    component.tasks = [{ name: 'Existing Task', completed: false }];

    component.addTask();

    expect(component.tasks.length).toBe(2);
    expect(component.tasks[1].name).toBe('New Task');
    expect(component.showTask).toBe(true);
    expect(component.showErrorMessage).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('Fn addTask - should not add a task if it already exists and show error message', () => {
    component.newTask = 'Existing Task';
    component.tasks = [{ name: 'Existing Task', completed: false }];

    component.addTask();
    
    expect(component.tasks.length).toBe(1);
    expect(component.showTask).toBe(false);
    expect(component.showErrorMessage).toBe(true);
    expect(component.errorMessage).toBe('Esta Tarea ya existe');
  });

  it('Fn addTask - should not add a task if newTask is empty', () => {
    component.newTask = '';

    component.addTask();

    expect(component.tasks.length).toBe(0);
    expect(component.showTask).toBe(false);
    expect(component.showErrorMessage).toBe(false);
    expect(component.errorMessage).toBe('');
  });
});
