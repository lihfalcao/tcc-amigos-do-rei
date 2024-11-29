import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleService } from '../services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-class',
  standalone: true,
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    NavbarComponent,
    MatButtonModule,
  ],
  providers: [ScheduleService],
})
export class ClassComponent implements OnInit {
  theme: any = [];
  id: any;

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadEvent(this.id);
  }

  loadEvent(id: number) {
    this.scheduleService.getTheme(id).subscribe((response: any) => {
      this.theme = response;
    });
  }

  abrirMenu() {
    console.log('abrirMenu');
  }

  goBack(): void {
    this.location.back();
  }

  medias(id: any): void {
    this.router.navigate(['/midias/', id]);
  }

  delete(id: any): void {
    this.scheduleService.deleteSchedule(id).subscribe((response: any) => {
      this.snackBar.open('Evento deletado com sucesso!', 'Fechar', { duration: 3000 });
      this.location.back();
    });
  }
}
