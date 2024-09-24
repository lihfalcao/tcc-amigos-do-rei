import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Não se esqueça de importar o CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { routerTransition } from '../router.animations';

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
  ]
})
export class LoginComponent {
  logo: any = "../../assets/images/logo-redondo.png"; // Verifique se o caminho está correto
  kids: any = "../../assets/images/kids.png"; // Verifique se o caminho está correto
  passwordInputType = 'password';
  passwordIcon = 'visibility';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('LoginComponent instantiated');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleVisibility() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordInputType === 'password' ? 'visibility' : 'visibility_off';
  }

  submit(value: any) {
    console.log('Form submitted:', value);
  }
}
