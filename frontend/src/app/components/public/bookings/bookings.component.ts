import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <app-header></app-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-10 animate-slide-up">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-3">My Bookings</h1>
          <p class="text-lg text-gray-600">Track your apartment booking requests</p>
        </div>
        
        @if (loading) {
          <div class="flex justify-center items-center py-20">
            <div class="text-center">
              <svg class="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600 text-lg">Loading bookings...</p>
            </div>
          </div>
        } @else if (bookings.length === 0) {
          <div class="text-center py-20">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
            <p class="text-gray-600 mb-6">You haven't made any booking requests yet.</p>
            <a routerLink="/units" class="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
              Browse Available Units
            </a>
          </div>
        } @else {
          <div class="space-y-6">
            @for (booking of bookings; track booking.id) {
              <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-slide-up">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div class="flex-1 mb-4 md:mb-0">
                    <div class="flex items-center space-x-4 mb-3">
                      <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold text-gray-900">{{ booking.tower_name }} - {{ booking.unit_number }}</h3>
                        <p class="text-sm text-gray-500 mt-1">
                          Requested on {{ booking.requested_date | date:'medium' }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div>
                      @if (booking.status === 'pending') {
                        <span class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold bg-yellow-100 text-yellow-800 border-2 border-yellow-200 shadow-sm">
                          <svg class="w-4 h-4 mr-2 text-yellow-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                          </svg>
                          Pending Review
                        </span>
                      } @else if (booking.status === 'approved') {
                        <span class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold bg-green-100 text-green-800 border-2 border-green-200 shadow-sm">
                          <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          Approved
                        </span>
                      } @else {
                        <span class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold bg-red-100 text-red-800 border-2 border-red-200 shadow-sm">
                          <svg class="w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                          </svg>
                          Declined
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>

      <app-footer></app-footer>
    </div>
  `
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.apiService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}

