import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login.request.payload'
import { LoginResponse } from '../login.response.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  hideLogin = document.getElementById('hide-button');

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

       if (data.authenticationToken === null) {
          return false;
        }
        this.loggedIn.emit(true);
        this.username.emit(data.username);
        
        return true;
      }));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      const jwtToken = this.localStorage.retrieve('authenticationToken');

      if(!jwtToken) {
        return next.handle(req);
      }

      const validRequest = req.clone(
        { headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });
      return next.handle(validRequest);
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.loggedIn.emit(false);
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');

  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
