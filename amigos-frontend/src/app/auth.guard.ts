import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // ou onde você armazena o token

    if (token) {
      return true; // O token existe, permite acesso
    } else {
      this.router.navigate(['/']); // Redireciona para a rota de login
      return false; // Impede o acesso
    }
  }
}
