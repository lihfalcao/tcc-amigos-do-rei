import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { routerTransition } from '../router.animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class LoginComponent {
  logo: any = "../../assets/images/logo-redondo.png";
  kids: any = "../../assets/images/kids.png"; 
  ipb: any = "../../assets/images/Ipb_logo.png";
  logo2: any = "../../assets/images/logo2.png";
  passwordInputType = 'password';
  passwordIcon = 'visibility';
  errorMessage = "";
  isButtonDisabled: boolean = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private loginService: LoginService, 
              private router: Router,
              private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.isButtonDisabled = false; 
    });
  }

  toggleVisibility() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordInputType === 'password' ? 'visibility' : 'visibility_off';
  }

  submit() {
    const credentials = {
      login: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };
  
    this.loginService.login(credentials).subscribe(
      response => {
        this.snackBar.open('Bem-vindo, ' + response.name, 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        localStorage.setItem('username', response.name); 
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/home']);
      },
      error => {
        if (error.error.message === "Invalid credentials") {
          this.errorMessage = 'Dados de login inválidos, tente novamente!';
          this.snackBar.open(this.errorMessage, 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          
          this.loginForm.controls['username'].setErrors({ invalid: true });
          this.loginForm.controls['password'].setErrors({ invalid: true });
        }
      }
    );
    
  }
}
