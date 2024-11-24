import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleService } from '../services/schedule.service';

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
    private location: Location
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
}
