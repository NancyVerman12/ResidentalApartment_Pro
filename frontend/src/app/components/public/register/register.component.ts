import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <app-header></app-header>

      <div class="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
        <div class="max-w-md w-full animate-slide-up">
          <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto mb-4">
                🎉
              </div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p class="text-gray-600">Join us and find your perfect home</p>
            </div>
            
            @if (error) {
              <div class="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 animate-fade-in">
                <div class="flex items-center">
                  <span class="mr-2">⚠️</span>
                  <span>{{ error }}</span>
                </div>
              </div>
            }
            
            <form (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">Username</label>
                <input
                  [(ngModel)]="username"
                  type="text"
                  id="username"
                  name="username"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Choose a username"
                />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">Email Address</label>
                <input
                  [(ngModel)]="email"
                  type="email"
                  id="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">Password</label>
                <input
                  [(ngModel)]="password"
                  type="password"
                  id="password"
                  name="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Create a strong password"
                />
              </div>
              <button
                type="submit"
                [disabled]="loading"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                @if (loading) {
                  <span class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                } @else {
                  Create Account
                }
              </button>
            </form>
            
            <div class="mt-6 text-center">
              <p class="text-gray-600">
                Already have an account?
                <a routerLink="/login" class="text-indigo-600 hover:text-indigo-800 font-semibold ml-1">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <app-footer></app-footer>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.loading = true;
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/units']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Registration failed. Please try again.';
      }
    });
  }
}

