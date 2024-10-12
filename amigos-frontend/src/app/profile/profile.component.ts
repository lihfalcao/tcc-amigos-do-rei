import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, FooterComponent, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userAvatar = '../../assets/images/avatar.png';

  constructor(private router: Router) {}

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

  editar() {
    console.log("Editar perfil");
  
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
