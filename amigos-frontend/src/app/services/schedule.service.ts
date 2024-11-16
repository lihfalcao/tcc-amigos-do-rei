import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ScheduleService {
  constructor(
    private http: HttpClient,
  ) {}

  private apiUrl = 'http://localhost:8081/api'; 
  private webUrl = 'http://localhost:8081'; 


  initializeSanctum(): Observable<void> {
    return this.http.get(`${this.webUrl}/sanctum/csrf-cookie`, { withCredentials: true }).pipe(
      map(() => {})
    );
  }
  
  getSchedulesForLoggedInUser(): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Pegue o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adicione o token no cabeçalho
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/schedule`, { headers, withCredentials: true })
      )
    );
  }
  
  

  // Obter eventos passados por professor
  getPassedSchedulesByProfessor(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedule/passed/${id}`);
  }

  // Salvar um novo schedule
  saveSchedule(data: { date: any; professorId: any; classId: any; themeId: any; }): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/schedule`, data);
  }

  // Outras requisições simples
  getTheme(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/themes/${id}`);
  }

  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`);
  }

  getThemes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/themes`);
  }

  saveTheme(data: { themeName: any; content: any; resume: any; }): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/themes`, data);
  }
}
