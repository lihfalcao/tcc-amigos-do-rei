import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';
import { FloatingMenuComponent } from '../floating-menu/floating-menu.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, FloatingMenuComponent],
  providers: [ScheduleService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  event: any = [];

  constructor(private snackBar: MatSnackBar, private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.scheduleService.getFutureSchedulesForLoggedInUser().subscribe(
      events => {
        if (events.schedules.length > 0) {
          this.event = events.schedules;
        } else {
          this.openSnackBar('Nenhum evento encontrado.'); 
        }
      },
      error => {
        this.openSnackBar('Erro ao carregar eventos.'); 
        console.error(error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, 
    });
  }

  abrirMenu() {
    console.log("abrirMenu");
  }
}
