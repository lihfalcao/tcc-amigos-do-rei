import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api'; // ajuste conforme necessário

  constructor(private http: HttpClient) {}

  // Método para obter o token CSRF
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/csrf-token`, { withCredentials: true });
  }

  // Método para fazer logout
  logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(csrfResponse => {
        const csrfToken = csrfResponse.token; // Aqui você obtém o token CSRF
        return this.http.post(this.apiUrl + "/logout", [], {
          headers: new HttpHeaders({
            'X-CSRF-TOKEN': csrfToken // Envia o token CSRF no cabeçalho
          }),
          withCredentials: true
        });
      })
    );
  }
}
