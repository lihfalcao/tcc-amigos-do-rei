import { Component } from '@angular/core';
import { FloatingMenuComponent } from '../floating-menu/floating-menu.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../services/schedule.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, MatIconModule, MatSelectModule, FormsModule, FloatingMenuComponent],
  providers: [ScheduleService],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  classes: any[] = [];
  professors: any[] = []; 
  expandedClassId: number | null = null; 
  selectedProfessor: number | null = null; 

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.loadTurmas();
    this.getProfessors();
  }

  // Carregar turmas
  loadTurmas() {
    this.scheduleService.getClasses().subscribe((data) => {
      this.classes = data.classes;
    });
  }

  // Expandir turma e carregar crianças e professores
  toggleTurma(ClassId: number) {
    if (this.expandedClassId === ClassId) {
      this.expandedClassId = null;
    } else {
      this.expandedClassId = ClassId;
    }
  }

  // Deletar turma
  deleteClass(ClassId: number) {
    this.scheduleService.deleteClass(ClassId).subscribe(() => {
      this.loadTurmas();
    });
  }
  
  getProfessors() {
    this.scheduleService.getProfessors().subscribe((response) => {
      this.professors = response.professors;
    });
  }

  deleteProfessor(ClassId: number, professorId: number) {
    this.scheduleService.deleteProfessorByClass(ClassId, professorId).subscribe(() => {
      this.loadTurmas();
    });
  }
  
  addProfessor(ClassId: number) {
    if(this.selectedProfessor != null){
      const data = { user_id: this.selectedProfessor, class_id: ClassId};
      this.scheduleService.addProfessorInClass(data).subscribe(() => {
        this.loadTurmas();
      });
    }
  }
}
