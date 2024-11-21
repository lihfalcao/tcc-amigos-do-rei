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
import { ScheduleService } from '../services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, FooterComponent, NavbarComponent, FormatPhonePipe, FormsModule],
  providers: [ScheduleService, LoginService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userAvatar = '';
  user: any = [];
  confirmPassword: string = '';
  events: any = [];

  constructor(private router: Router, private loginService: LoginService, private scheduleService: ScheduleService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getUser();
    this.getEvents();
  }

  getUser() {
    this.loginService.getLoggedInUser().subscribe(
      user => {
        this.user = user.user;
        this.userAvatar = this.user.avatar ?  'http://localhost:8081/storage/avatars/' + this.user.avatar : '../../assets/images/avatar.png';
      });
  }

  getEvents(){
    this.scheduleService.getSchedulesForLoggedInUser().subscribe(
      events => {
        if (events.schedules.length > 0) {
          this.events = events.schedules;
        } 
      }
    );
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
      const formData = new FormData();
      formData.append('avatar', file);
      this.loginService.updateAvatar(formData).subscribe(
        response => {
          this.openSnackBar('Avatar atualizado com sucesso!'); 
        },
        error => {
          this.openSnackBar('Erro ao atualizar o avatar.'); 
        }
      );
    }
  }

  onSubmit() {
    if (this.user.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    this.loginService.updateLoggedInUser(this.user).subscribe(
      response => {
        this.openSnackBar('Dados atualizados com sucesso!'); 
      },
      error => {
        this.openSnackBar('Erro ao atualizar os dados.'); 
      }
    );
    
  }

  onCancel() {
    // Reverter alterações ou redefinir o formulário
    this.user.password = '';
    this.confirmPassword = '';
    console.log('Edição cancelada');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, 
    });
  }

}
