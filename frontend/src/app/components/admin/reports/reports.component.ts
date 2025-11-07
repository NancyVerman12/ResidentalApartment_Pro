import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center space-x-4">
              <a routerLink="/" class="text-2xl font-bold text-indigo-600">🏢 Admin Portal</a>
            </div>
            <div class="flex items-center space-x-4">
              <a routerLink="/admin" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Dashboard</a>
              <a routerLink="/admin/units" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Units</a>
              <a routerLink="/admin/bookings" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Bookings</a>
              <a routerLink="/admin/tenants" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Tenants</a>
              <a routerLink="/admin/reports" class="px-4 py-2 bg-indigo-600 text-white rounded">Reports</a>
              <button (click)="logout()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>
        
        <!-- Occupancy Report -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-2xl font-bold mb-4">Occupancy Report</h2>
          @if (occupancyLoading) {
            <div class="text-center py-8">Loading...</div>
          } @else if (occupancy) {
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-blue-50 p-4 rounded">
                <h3 class="text-sm font-medium text-gray-600">Total Units</h3>
                <p class="text-2xl font-bold text-blue-600">{{ occupancy.total_units }}</p>
              </div>
              <div class="bg-green-50 p-4 rounded">
                <h3 class="text-sm font-medium text-gray-600">Occupied</h3>
                <p class="text-2xl font-bold text-green-600">{{ occupancy.occupied_units }}</p>
              </div>
              <div class="bg-yellow-50 p-4 rounded">
                <h3 class="text-sm font-medium text-gray-600">Available</h3>
                <p class="text-2xl font-bold text-yellow-600">{{ occupancy.available_units }}</p>
              </div>
              <div class="bg-purple-50 p-4 rounded">
                <h3 class="text-sm font-medium text-gray-600">Occupancy Rate</h3>
                <p class="text-2xl font-bold text-purple-600">{{ occupancy.occupancy_rate }}%</p>
              </div>
            </div>
          }
        </div>

        <!-- Payments Report -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold mb-4">Payment Report</h2>
          @if (paymentsLoading) {
            <div class="text-center py-8">Loading...</div>
          } @else if (payments) {
            <div class="mb-4">
              <div class="bg-indigo-50 p-4 rounded inline-block">
                <h3 class="text-sm font-medium text-gray-600">Total Monthly Revenue</h3>
                <p class="text-3xl font-bold text-indigo-600">{{ '₹' + payments.total_revenue }}</p>
              </div>
              <div class="bg-green-50 p-4 rounded inline-block ml-4">
                <h3 class="text-sm font-medium text-gray-600">Active Leases</h3>
                <p class="text-3xl font-bold text-green-600">{{ payments.active_leases }}</p>
              </div>
            </div>
            @if (payments.payments.length > 0) {
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenant</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Rent</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (payment of payments.payments; track payment.lease_id) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payment.tenant_name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payment.unit }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ '₹' + payment.monthly_rent }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {{ payment.status }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ payment.due_date }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="text-gray-500">No active leases</p>
            }
          }
        </div>
      </div>
    </div>
  `
})
export class AdminReportsComponent implements OnInit {
  occupancy: any = null;
  payments: any = null;
  occupancyLoading = true;
  paymentsLoading = true;

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.apiService.getOccupancyReport().subscribe({
      next: (data) => {
        this.occupancy = data;
        this.occupancyLoading = false;
      },
      error: () => {
        this.occupancyLoading = false;
      }
    });

    this.apiService.getPaymentsReport().subscribe({
      next: (data) => {
        this.payments = data;
        this.paymentsLoading = false;
      },
      error: () => {
        this.paymentsLoading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}

