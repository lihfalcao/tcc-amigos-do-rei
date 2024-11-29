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
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/schedule`, { headers, withCredentials: true })
      )
    );
  }

  getFutureSchedulesForLoggedInUser(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/schedule/future`, { headers, withCredentials: true })
      )
    );
  }
  

  getSchedules(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/schedules`, { headers, withCredentials: true })
      )
    );
  }

  getTheme(id: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/theme/${id}`, { headers, withCredentials: true })
      )
    );
  }

  getSchedule(id: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/schedule/${id}`, { headers, withCredentials: true })
      )
    );
  }


  getThemes(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/themes`, { headers, withCredentials: true })
      )
    );
  }

  getClasses(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/classes`, { headers, withCredentials: true })
      )
    );
  }

  getProfessors(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.get(`${this.apiUrl}/professors`, { headers, withCredentials: true })
      )
    );
  }

  updateTheme(id: any, data: []): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.put(`${this.apiUrl}/class/${id}`, data, { headers, withCredentials: true })
      )
    );
  }

  saveSchedule(data: []): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/schedule`, data, { headers, withCredentials: true })
      )
    );
  }

  saveTheme(data: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/class`, data, { headers, withCredentials: true })
      )
    );
  }

  deleteSchedule(id: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.initializeSanctum().pipe(
      switchMap(() =>
        this.http.delete(`${this.apiUrl}/class/${id}`, { headers, withCredentials: true })
      )
    );
  }

}
