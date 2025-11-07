import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="glass-effect sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">
          <div class="flex items-center space-x-4">
            <a routerLink="/" class="flex items-center space-x-4 group">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div class="relative w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h1 class="text-2xl font-extrabold gradient-text tracking-tight">
                  ApartmentPortal
                </h1>
                <p class="text-xs text-gray-500 font-medium -mt-1">Premium Living Spaces</p>
              </div>
            </a>
          </div>
          <div class="flex items-center space-x-2">
            @if (authService.currentUser$ | async; as user) {
              <div class="flex items-center space-x-3 mr-4 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur opacity-50"></div>
                  <div class="relative w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div class="hidden lg:block">
                  <p class="text-sm font-bold text-gray-900">{{ user.username }}</p>
                  <p class="text-xs text-gray-500 font-medium">{{ user.role === 'admin' ? 'Administrator' : 'Resident' }}</p>
                </div>
              </div>
              @if (user.role === 'admin') {
                <a routerLink="/admin" class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5">
                  Admin Portal
                </a>
              }
              <a routerLink="/units" class="hidden md:block nav-link px-4 py-2.5 font-semibold">
                <svg class="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Browse
              </a>
              <a routerLink="/bookings" class="hidden md:block nav-link px-4 py-2.5 font-semibold">
                <svg class="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Bookings
              </a>
              <button (click)="logout()" class="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5">
                <svg class="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            } @else {
              <a routerLink="/units" class="hidden md:block nav-link px-4 py-2.5 font-semibold">
                <svg class="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Browse Units
              </a>
              <a routerLink="/login" class="nav-link px-4 py-2.5 font-semibold">Login</a>
              <a routerLink="/register" class="btn-primary px-6 py-2.5">
                Sign Up Free
              </a>
            }
          </div>
        </div>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
  
  logout() {
    this.authService.logout();
  }
}
