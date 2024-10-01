import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  event: any = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    // Exemplo de chamada de serviço (descomentado conforme necessário)
    // this.eventService.getEventsForLoggedInUser().subscribe(
    //   events => {
    //     if (events.length > 0) {
    //       this.event = events[0];
    //       console.log(this.event);
    //     } else {
    //       this.openSnackBar('Nenhum evento encontrado.'); // Usar Snackbar para mensagem
    //     }
    //   },
    //   error => {
    //     this.openSnackBar('Erro ao carregar eventos.'); // Usar Snackbar para erro
    //     console.error(error);
    //   }
    // );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // Tempo que a snackbar ficará visível
    });
  }

  abrirMenu() {
    console.log("abrirMenu");
  }
}
