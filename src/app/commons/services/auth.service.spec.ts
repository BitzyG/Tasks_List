import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for correct username and password', () => {
    const username = 'test01';
    const password = 'test01';
    service.login(username, password).subscribe((loggedIn: boolean) => {
      expect(loggedIn).toBeTruthy();
    });
  });

  it('should return false for incorrect username and password', () => {
    const username = 'incorrect_username';
    const password = 'incorrect_password';
    service.login(username, password).subscribe((loggedIn: boolean) => {
      expect(loggedIn).toBeFalsy();
    });
  });
});
