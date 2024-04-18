import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/commons/services/auth.service';
import { loginSuccess } from '../../commons/store/app.auth.actions';
import { AppState } from 'src/app/commons/store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private store: Store<AppState>
  ) { }

  onSubmit() {
    const username = this.username;
    const password = this.password;
    const userData = {
      username: username,
      password: password,
    }
    
    this.authService.login(username, password).subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.store.dispatch(loginSuccess({user: userData}));
        this.router.navigate(['/taskDashboard']); 
        this.showErrorMessage = false;
      } else {
        this.showErrorMessage = true;
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }
    });
  }  
}
