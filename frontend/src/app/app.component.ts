/**
 * Residential Apartment Rental Portal - Main App Component
 * Author: Nancy Verma
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'Residential Apartment Portal';
}

