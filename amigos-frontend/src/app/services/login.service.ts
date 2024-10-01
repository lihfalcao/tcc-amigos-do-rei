import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/login'; 

  constructor(private http: HttpClient) { }

  login(credentials: { login: string; password: string; rememberMe: boolean }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}