import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    FullCalendarModule,
    NavbarComponent,
    FooterComponent,
  ],
  providers: [ScheduleService],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: ptBrLocale,
    events: [],
    eventClick: this.handleDateClick.bind(this), 
  };

  colors = ['#41C4FC', '#FE6BAB', '#6ace9e', '#F9C00D', '#8C4EDA'];

  constructor(private scheduleService: ScheduleService, private router: Router) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.scheduleService.getSchedules().subscribe((response: any) => {
      this.calendarOptions.events = response.schedules.map((event: any) => ({
        id: event.theme_id,
        title: `${event.class.name} - ${event.professor.name}`,
        date: event.date,
        color: this.colors[event.class_id],
      }));
    });
  }

  handleDateClick(arg: any) {
    const eventId = arg.event.id;
    if (eventId) {
      this.router.navigate([`/aula/${eventId}`]);
    } else {
      alert('Nenhum evento associado a esta data!');
    }
  }
}
