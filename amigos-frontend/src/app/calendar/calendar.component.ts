import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';
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
  };

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    // this.scheduleService.getEventsWithProfessors().subscribe((eventsWithProfessors) => {
    //   this.calendarOptions.events = eventsWithProfessors.map((event) => ({
    //     id: event.id,
    //     title: `${event.className} - ${event.professorName}`,
    //     date: event.date,
    //     color: event.classColor,
    //   }));
    // });
  }
}
