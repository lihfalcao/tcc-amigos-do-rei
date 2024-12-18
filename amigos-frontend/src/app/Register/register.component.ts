import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleService } from '../services/schedule.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { IMaskModule } from 'angular-imask';
import { LoginService } from '../services/login.service';
import { FloatingMenuComponent } from '../floating-menu/floating-menu.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarComponent,
    IMaskModule,
    FloatingMenuComponent
  ],
  providers: [MatSnackBar, LoginService],
})
export class RegisterComponent {
  classForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    type: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
    ) {}

  ngOnInit() {

  }

  submit(data: any) {
    this.loginService.saveUser(data).subscribe(
      () => {
        this.snackBar.open('Usuário criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/turmas']);
      },
      () => {
        this.snackBar.open('Erro ao criar o usuário!', 'Fechar', { duration: 3000 });
      }
    );
  }
}
