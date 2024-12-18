import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  templateUrl: './floating-menu.component.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  styleUrls: ['./floating-menu.component.scss'],
})
export class FloatingMenuComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }
}
