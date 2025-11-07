import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-units',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
              <a routerLink="/admin/units" class="px-4 py-2 bg-indigo-600 text-white rounded">Units</a>
              <a routerLink="/admin/bookings" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Bookings</a>
              <a routerLink="/admin/tenants" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Tenants</a>
              <a routerLink="/admin/reports" class="px-4 py-2 text-gray-700 hover:text-indigo-600">Reports</a>
              <button (click)="logout()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Manage Units</h1>
          <button
            (click)="showModal = true; editingUnit = null; resetForm()"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            ➕ Add Unit
          </button>
        </div>

        @if (loading) {
          <div class="text-center py-12">Loading units...</div>
        } @else {
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tower</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bed/Bath</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rent</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                @for (unit of units; track unit.id) {
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ unit.tower_name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ unit.unit_number }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ unit.bedrooms }}/{{ unit.bathrooms }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ unit.area }} sqft</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ '₹' + unit.rent }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      @if (unit.is_available) {
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>
                      } @else {
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Occupied</span>
                      }
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button (click)="editUnit(unit)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                      <button (click)="deleteUnit(unit.id)" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- Modal -->
      @if (showModal) {
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" (click)="showModal = false">
          <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" (click)="$event.stopPropagation()">
            <h3 class="text-lg font-bold mb-4">{{ editingUnit ? 'Edit Unit' : 'Add Unit' }}</h3>
            <form (ngSubmit)="saveUnit()">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Tower Name</label>
                  <input [(ngModel)]="formData.tower_name" name="tower_name" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Unit Number</label>
                  <input [(ngModel)]="formData.unit_number" name="unit_number" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Bedrooms</label>
                    <input [(ngModel)]="formData.bedrooms" name="bedrooms" type="number" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Bathrooms</label>
                    <input [(ngModel)]="formData.bathrooms" name="bathrooms" type="number" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Area (sqft)</label>
                  <input [(ngModel)]="formData.area" name="area" type="number" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Rent (₹)</label>
                  <input [(ngModel)]="formData.rent" name="rent" type="number" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Available</label>
                  <input [(ngModel)]="formData.is_available" name="is_available" type="checkbox" class="mt-1">
                </div>
              </div>
              <div class="mt-6 flex justify-end space-x-3">
                <button type="button" (click)="showModal = false" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminUnitsComponent implements OnInit {
  units: any[] = [];
  amenities: any[] = [];
  loading = true;
  showModal = false;
  editingUnit: any = null;
  formData: any = {
    tower_name: '',
    unit_number: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    rent: 0,
    is_available: true,
    amenity_ids: []
  };

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUnits();
    this.loadAmenities();
  }

  loadUnits() {
    this.loading = true;
    this.apiService.adminGetUnits().subscribe({
      next: (data) => {
        this.units = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadAmenities() {
    this.apiService.adminGetAmenities().subscribe(data => {
      this.amenities = data;
    });
  }

  resetForm() {
    this.formData = {
      tower_name: '',
      unit_number: '',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      rent: 0,
      is_available: true,
      amenity_ids: []
    };
  }

  editUnit(unit: any) {
    this.editingUnit = unit;
    this.formData = {
      tower_name: unit.tower_name,
      unit_number: unit.unit_number,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      area: unit.area,
      rent: unit.rent,
      is_available: unit.is_available,
      amenity_ids: unit.amenities.map((a: any) => a.id)
    };
    this.showModal = true;
  }

  saveUnit() {
    if (this.editingUnit) {
      this.apiService.adminUpdateUnit(this.editingUnit.id, this.formData).subscribe({
        next: () => {
          this.showModal = false;
          this.loadUnits();
        },
        error: (err) => alert(err.error?.error || 'Failed to update unit')
      });
    } else {
      this.apiService.adminCreateUnit(this.formData).subscribe({
        next: () => {
          this.showModal = false;
          this.loadUnits();
        },
        error: (err) => alert(err.error?.error || 'Failed to create unit')
      });
    }
  }

  deleteUnit(unitId: number) {
    if (confirm('Are you sure you want to delete this unit?')) {
      this.apiService.adminDeleteUnit(unitId).subscribe({
        next: () => {
          this.loadUnits();
        },
        error: (err) => alert(err.error?.error || 'Failed to delete unit')
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}

