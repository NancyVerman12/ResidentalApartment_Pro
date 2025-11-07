import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-tenants',
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
              <a routerLink="/admin/tenants" class="px-4 py-2 bg-indigo-600 text-white rounded">Tenants</a>
              <a routerLink="/admin/reports" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Reports</a>
              <button (click)="logout()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Manage Tenants</h1>
        @if (loading) {
          <div class="text-center py-12">Loading tenants...</div>
        } @else if (tenants.length === 0) {
          <div class="text-center py-12 text-gray-500">No active tenants</div>
        } @else {
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lease Start</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lease End</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Rent</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                @for (tenant of tenants; track tenant.user_id) {
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ tenant.username }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ tenant.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ tenant.unit }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ tenant.lease_start | date:'shortDate' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ tenant.lease_end | date:'shortDate' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ '₹' + tenant.monthly_rent }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminTenantsComponent implements OnInit {
  tenants: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.loading = true;
    this.apiService.getTenants().subscribe({
      next: (data) => {
        this.tenants = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}

