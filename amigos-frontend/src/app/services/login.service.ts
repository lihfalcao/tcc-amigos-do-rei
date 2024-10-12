import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api'; 
  private webUrl = 'http://localhost:8081'; 


  constructor(private http: HttpClient) {}

  // Função para obter o token CSRF do backend
  getCsrfToken(): Observable<string> {
    return this.http.get<{ csrf_token: string }>(`${this.webUrl}/csrf-token`)
      .pipe(map(response => {
        return response.csrf_token;
      }));
  }

  // Modifique o método de login para incluir o CSRF Token no cabeçalho
  login(credentials: { login: string; password: string; rememberMe: boolean }): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': token
        });
        return this.http.post(`${this.apiUrl}/login`, credentials, { headers, withCredentials: true });
      })
    );
  }

  // Modifique o método de logout para incluir o CSRF Token no cabeçalho
  logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(token => {
        const accessToken = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        });
        return this.http.post(`${this.apiUrl}/logout`, {}, { headers, withCredentials: true });
      })
    );
  }
  
  
}
