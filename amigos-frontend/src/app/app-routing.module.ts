import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ClassComponent } from './class/class.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddCalendarComponent } from './calendar/add-calendar/add-calendar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'meu-perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'aula/:id', component: ClassComponent, canActivate: [AuthGuard] },
  { path: 'calendario', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'calendario/adicionar', component: AddCalendarComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
