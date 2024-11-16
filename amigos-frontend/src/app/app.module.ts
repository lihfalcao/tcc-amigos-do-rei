import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './auth.interceptor';
import { ScheduleService } from './services/schedule.service';
import { DebugInterceptor } from './interceptors/debug.interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN', 
      headerName: 'X-XSRF-TOKEN', 
    }),
  ],
  providers: [
    LoginService,
    ScheduleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DebugInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
