import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleService } from '../../services/schedule.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-add-calendar',
  standalone: true,
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarComponent
  ],
  providers: [ScheduleService, MatSnackBar],
})
export class AddCalendarComponent {
  calendarForm = this.fb.group({
    date: ['', Validators.required],
    class: ['', Validators.required],
    theme: ['', Validators.required],
    professor: ['', Validators.required],
    themeName: [''],
    content: [''],
    resume: [''],
  });

  classes: any = [];
  themes: any = [];
  professors: any = [];
  showThemes: boolean = false;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getClasses();
    this.getThemes();
    this.getProfessors();

    this.calendarForm.get('theme')?.valueChanges.subscribe((value) => {
      this.showThemes = value === 'novo';
    });
  }

  getClasses() {
    this.scheduleService.getClasses().subscribe((response) => {
      this.classes = response.classes;
    });
  }

  getThemes() {
    this.scheduleService.getThemes().subscribe((response) => {
      this.themes = response.themes;
    });
  }

  getProfessors() {
    this.scheduleService.getProfessors().subscribe((response) => {
      this.professors = response.professors;
    });
  }

  submit(data: any) {
    if (this.calendarForm.get('theme')?.value === 'novo') {
      const themeData = {
        themeName: this.calendarForm.get('themeName')?.value,
        content: this.calendarForm.get('content')?.value,
        resume: this.calendarForm.get('resume')?.value,
      };
      this.scheduleService.saveTheme(themeData).subscribe((response) => {
        const eventData = {
          date: this.calendarForm.get('date')?.value,
          user_id: this.calendarForm.get('professor')?.value,
          class_id: this.calendarForm.get('class')?.value,
          theme_id: response.id,
        };
        this.saveEvent(eventData);
      });
    } else {
      const eventData = {
        date: this.calendarForm.get('date')?.value,
        user_id: this.calendarForm.get('professor')?.value,
        class_id: this.calendarForm.get('class')?.value,
        theme_id: this.calendarForm.get('theme')?.value,
      };
      this.saveEvent(eventData);
    }
  }

  saveEvent(eventData: any) {
    this.scheduleService.saveSchedule(eventData).subscribe(
      () => {
        this.snackBar.open('Evento criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/calendario']);
      },
      () => {
        this.snackBar.open('Erro ao criar o evento!', 'Fechar', { duration: 3000 });
      }
    );
  }
}
