import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authorisedStatus = new BehaviorSubject<boolean>(false);

  private token: string | undefined;
  constructor(private router: Router,
    private http: HttpClient) {
    this.authorisedStatus.next(this.getAuthorisedStatus());
  }

  getAuthorisedStatus(): boolean {
    // if "auth_data" is placed in local storage - it is authorized person
    return !!localStorage.getItem('auth_data');
  }

  login(username: string, password: string): Observable<TokenRequestInterface> {
    const requestData: LoginRequestInterface = { 'user_data': { 'email': username, 'password': password }};

    return this.http.post<TokenRequestInterface>('/public/login', requestData).pipe(map((response) => {
      localStorage.setItem('auth_data', JSON.stringify({ username, token: response?.token }));
      this.router.navigate(['/']);

      return response;
    }));
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('auth_data');
    this.router.navigate(['/']);
  }
}

export interface LoginRequestInterface {
  user_data: {email: string, password: string};
}

export interface TokenRequestInterface {
  token: string;
}
