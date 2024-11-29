import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  templateUrl: './floating-menu.component.html',
  imports: [CommonModule],
  styleUrls: ['./floating-menu.component.scss'],
})
export class FloatingMenuComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }
}
