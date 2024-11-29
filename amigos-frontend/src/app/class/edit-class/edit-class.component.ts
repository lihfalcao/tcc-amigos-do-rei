import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleService } from '../../services/schedule.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-class',
  standalone: true,
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarComponent,
    MatIconModule
  ],
  providers: [ScheduleService, MatSnackBar],
})
export class EditClassComponent implements OnInit {
  classForm = this.fb.group({
    date: ['', Validators.required],
    theme: ['', Validators.required],
    professors: this.fb.array([]), // FormArray para professor e turma
  });

  classes: any = [];
  themes: any = [];
  professorsList: any = [];
  eventId: string = '';

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.getEventDetails();
    this.getClasses();
    this.getThemes();
    this.getProfessors();
  }

  getEventDetails() {
    this.scheduleService.getTheme(this.eventId).subscribe((event) => {
      this.classForm.patchValue({
        date: event.date_f,
        theme: event.id,
      });

      // Carregar professores associados
      event.professors.forEach((professorClass: any) => {
        this.addProfessor(professorClass.classId, professorClass.id, professorClass.scheduleId);
      });
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
      this.professorsList = response.professors;
    });
  }

  get professors() {
    return this.classForm.get('professors') as FormArray;
  }

  addProfessor(classId: string = '', professorId: string = '', scheduleId: string = '') {
    const professorGroup = this.fb.group({
      class: [classId, Validators.required],
      professor: [professorId, Validators.required],
      schedule: [scheduleId]
    });
    this.professors.push(professorGroup);
  }

  removeProfessor(index: number) {
    this.professors.removeAt(index);
  }

  submit(data: any) {
    const eventData = {
      id: this.eventId,
      date: this.classForm.get('date')?.value,
      themeId: this.classForm.get('theme')?.value,
      professors: this.professors.value, // Enviar array de professores e turmas
    };

    this.updateEvent(eventData);
  }

  updateEvent(eventData: any) {
    this.scheduleService.updateTheme(this.eventId, eventData).subscribe(
      () => {
        this.snackBar.open('Evento atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/calendario']);
      },
      () => {
        this.snackBar.open('Erro ao atualizar o evento!', 'Fechar', { duration: 3000 });
      }
    );
  }
}
