import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-admin-dashboard',
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
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Admin Dashboard</h1>
          <p class="text-lg text-gray-600">Welcome back! Here's your property overview</p>
        </div>
        
        @if (loading) {
          <div class="flex justify-center items-center py-20">
            <div class="text-center">
              <svg class="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600 text-lg">Loading dashboard...</p>
            </div>
          </div>
        } @else {
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-indigo-500">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Units</h3>
                <div class="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
                  <span class="text-3xl">🏢</span>
                </div>
              </div>
              <p class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {{ occupancy?.total_units || 0 }}
              </p>
              <p class="text-sm text-gray-500">Properties managed</p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-green-500">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Occupied</h3>
                <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                  <span class="text-3xl">✅</span>
                </div>
              </div>
              <p class="text-4xl font-bold text-green-600 mb-2">{{ occupancy?.occupied_units || 0 }}</p>
              <p class="text-sm text-gray-500">Currently rented</p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-blue-500">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Available</h3>
                <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <span class="text-3xl">🔓</span>
                </div>
              </div>
              <p class="text-4xl font-bold text-blue-600 mb-2">{{ occupancy?.available_units || 0 }}</p>
              <p class="text-sm text-gray-500">Ready to rent</p>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-purple-500">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Occupancy Rate</h3>
                <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <span class="text-3xl">📊</span>
                </div>
              </div>
              <p class="text-4xl font-bold text-purple-600 mb-2">{{ occupancy?.occupancy_rate || 0 }}%</p>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" [style.width.%]="occupancy?.occupancy_rate || 0"></div>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <!-- Quick Actions -->
            <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span class="mr-3 text-3xl">⚡</span>
                Quick Actions
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a routerLink="/admin/units" class="group p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border-2 border-transparent hover:border-indigo-300">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-3xl">🏢</span>
                    <span class="text-indigo-600 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Manage Units</h3>
                  <p class="text-sm text-gray-600">Add, edit, or remove properties</p>
                </a>
                
                <a routerLink="/admin/bookings" class="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border-2 border-transparent hover:border-green-300">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-3xl">📋</span>
                    <span class="text-green-600 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Manage Bookings</h3>
                  <p class="text-sm text-gray-600">Review and approve requests</p>
                </a>
                
                <a routerLink="/admin/tenants" class="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 border-2 border-transparent hover:border-blue-300">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-3xl">👥</span>
                    <span class="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">View Tenants</h3>
                  <p class="text-sm text-gray-600">Manage active residents</p>
                </a>
                
                <a routerLink="/admin/reports" class="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border-2 border-transparent hover:border-purple-300">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-3xl">📈</span>
                    <span class="text-purple-600 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">View Reports</h3>
                  <p class="text-sm text-gray-600">Analytics and insights</p>
                </a>
              </div>
            </div>
            
            <!-- System Status -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span class="mr-3 text-3xl">📈</span>
                System Status
              </h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-2xl">✅</span>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">System Operational</p>
                      <p class="text-xs text-gray-600">All services running</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Active</span>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-2xl">💾</span>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Database</p>
                      <p class="text-xs text-gray-600">Connected & synced</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Online</span>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span class="text-2xl">🔒</span>
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Security</p>
                      <p class="text-xs text-gray-600">Protected & encrypted</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">Secure</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity Placeholder -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span class="mr-3 text-3xl">📋</span>
              Recent Activity
            </h2>
            <div class="text-center py-12 text-gray-500">
              <p class="text-lg">No recent activity to display</p>
              <p class="text-sm mt-2">Activity will appear here as you manage your properties</p>
            </div>
          </div>
        }
      </div>

      <app-footer></app-footer>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  occupancy: any = null;
  loading = true;

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.apiService.getOccupancyReport().subscribe({
      next: (data) => {
        this.occupancy = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
