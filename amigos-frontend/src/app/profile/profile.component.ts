import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginService } from '../services/login.service';
import { FormatPhonePipe } from '../format-phone.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, FooterComponent, NavbarComponent, FormatPhonePipe, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userAvatar = '../../assets/images/avatar.png';
  user: any = [];
  confirmPassword: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.getUser();
    
  }

  getUser() {
    this.loginService.getLoggedInUser().subscribe(
      user => {
        this.user = user.user;
      });

  }
    

  onUploadClick(): void {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput.click(); // Simula o clique no input de arquivo invisível
  }

  // Método que captura o arquivo selecionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userAvatar = e.target.result; // Atualiza a imagem do avatar com a nova foto
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.user.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Aqui você pode enviar os dados para o backend ou salvar as alterações
    console.log('Dados salvos:', this.user);
  }

  onCancel() {
    // Reverter alterações ou redefinir o formulário
    this.user.password = '';
    this.confirmPassword = '';
    console.log('Edição cancelada');
  }

  editar() {
    console.log("Editar perfil");
  
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
