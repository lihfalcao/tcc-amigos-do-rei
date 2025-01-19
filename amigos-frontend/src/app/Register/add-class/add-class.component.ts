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
import { IMaskModule } from 'angular-imask';

@Component({
  selector: 'app-add-class',
  standalone: true,
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarComponent,
    IMaskModule
  ],
  providers: [ScheduleService, MatSnackBar],
})
export class AddClassComponent {
  classForm = this.fb.group({
    name: ['', Validators.required],
    start_age: ['', Validators.required],
    end_age: ['', Validators.required],
    shift: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {

  }

  submit(data: any) {
    this.scheduleService.saveClass(data).subscribe(
      () => {
        this.snackBar.open('Turma criada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/turmas']);
      },
      () => {
        this.snackBar.open('Erro ao criar a turma!', 'Fechar', { duration: 3000 });
      }
    );
  }
}
