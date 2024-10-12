import { Component, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  logo:any;
    calendar:any;
    message:any;
    name: any;
    @Input() actualPage :string | undefined;
    logged: boolean = false;
    data:any;
    userAvatar:any;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
      this.logo = '../../assets/images/logo-navbar.png';
      this.calendar = '../../assets/images/calendar.png';
      this.message = '../../assets/images/message.png';
      this.name = localStorage.getItem('username');
    }
  
  
    logout(){
      if(confirm('Deseja realmente deslogar?')){
        this.loginService.logout().subscribe(data =>{
          localStorage.removeItem('auth_token');
          localStorage.removeItem('username');

          this.router.navigate(["/"]);
        });
      };
    }

    redirecionarParaWhatsApp(): void {
      const groupLink = 'https://chat.whatsapp.com/Cwj5YHfj0chH01n6ysuIzp';  
      
      window.open(groupLink, '_blank');
    }


    verPerfil(){
      this.router.navigate(["/meu-perfil"]);
    }

}
