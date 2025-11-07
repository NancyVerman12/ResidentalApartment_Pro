import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <app-header></app-header>

      <!-- Admin Navigation Bar -->
      <div class="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center space-x-1 overflow-x-auto py-4">
            <a routerLink="/admin" routerLinkActive="bg-indigo-600 text-white" [routerLinkActiveOptions]="{exact: true}" class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-indigo-50 text-gray-700">
              📊 Dashboard
            </a>
            <a routerLink="/admin/units" routerLinkActive="bg-indigo-600 text-white" class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-indigo-50 text-gray-700">
              🏢 Units
            </a>
            <a routerLink="/admin/bookings" routerLinkActive="bg-indigo-600 text-white" class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-indigo-50 text-gray-700">
              📋 Bookings
            </a>
            <a routerLink="/admin/tenants" routerLinkActive="bg-indigo-600 text-white" class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-indigo-50 text-gray-700">
              👥 Tenants
            </a>
            <a routerLink="/admin/reports" routerLinkActive="bg-indigo-600 text-white" class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-indigo-50 text-gray-700">
              📈 Reports
            </a>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-10">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Manage Bookings</h1>
          <p class="text-lg text-gray-600">Review and approve booking requests</p>
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
          <div class="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div class="text-6xl mb-4">📋</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
            <p class="text-gray-600">No booking requests at the moment</p>
          </div>
        } @else {
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Unit</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tenant</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Requested Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  @for (booking of bookings; track booking.id) {
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                            🏢
                          </div>
                          <div>
                            <div class="text-sm font-semibold text-gray-900">{{ booking.tower_name }} - {{ booking.unit_number }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ booking.user_name }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {{ booking.requested_date | date:'medium' }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        @if (booking.status === 'pending') {
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                            <span class="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                            Pending
                          </span>
                        } @else if (booking.status === 'approved') {
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                            <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Approved
                          </span>
                        } @else {
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                            <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            Declined
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        @if (booking.status === 'pending') {
                          <div class="flex space-x-2">
                            <button
                              (click)="approveBooking(booking.id)"
                              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                              ✓ Approve
                            </button>
                            <button
                              (click)="declineBooking(booking.id)"
                              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                              ✗ Decline
                            </button>
                          </div>
                        } @else {
                          <span class="text-gray-400">—</span>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>

      <app-footer></app-footer>
    </div>
  `
})
export class AdminBookingsComponent implements OnInit {
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

  approveBooking(bookingId: number) {
    if (confirm('Are you sure you want to approve this booking?')) {
      this.apiService.approveBooking(bookingId).subscribe({
        next: () => {
          alert('Booking approved successfully!');
          this.loadBookings();
        },
        error: (err) => alert(err.error?.error || 'Failed to approve booking')
      });
    }
  }

  declineBooking(bookingId: number) {
    if (confirm('Are you sure you want to decline this booking?')) {
      this.apiService.declineBooking(bookingId).subscribe({
        next: () => {
          alert('Booking declined');
          this.loadBookings();
        },
        error: (err) => alert(err.error?.error || 'Failed to decline booking')
      });
    }
  }

}

