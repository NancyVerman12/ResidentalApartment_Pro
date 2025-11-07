import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <!-- Search and Filter Bar -->
      <div class="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                [(ngModel)]="searchQuery"
                (input)="filterUnits()"
                type="text"
                placeholder="Search by tower, unit number..."
                class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <select
                [(ngModel)]="filterBedrooms"
                (change)="filterUnits()"
                class="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
              >
                <option value="">All Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
              </svg>
              <select
                [(ngModel)]="sortBy"
                (change)="filterUnits()"
                class="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 appearance-none bg-white"
              >
                <option value="rent-asc">Rent: Low to High</option>
                <option value="rent-desc">Rent: High to Low</option>
                <option value="area-asc">Area: Small to Large</option>
                <option value="area-desc">Area: Large to Small</option>
              </select>
            </div>
            <button
              (click)="clearFilters()"
              class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              Reset
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <p class="text-sm text-gray-600">
              Showing <span class="font-semibold text-gray-900">{{ filteredUnits.length }}</span> of <span class="font-semibold text-gray-900">{{ allUnits.length }}</span> properties
            </p>
            <div class="flex items-center space-x-2">
              <button
                (click)="viewMode = 'grid'"
                [class.bg-indigo-600]="viewMode === 'grid'"
                [class.text-white]="viewMode === 'grid'"
                [class.text-gray-600]="viewMode !== 'grid'"
                class="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              </button>
              <button
                (click)="viewMode = 'list'"
                [class.bg-indigo-600]="viewMode === 'list'"
                [class.text-white]="viewMode === 'list'"
                [class.text-gray-600]="viewMode !== 'list'"
                class="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        @if (loading) {
          <div class="flex justify-center items-center py-20">
            <div class="text-center">
              <svg class="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600 text-lg font-medium">Loading properties...</p>
            </div>
          </div>
        } @else if (filteredUnits.length === 0) {
          <div class="text-center py-20">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p class="text-gray-600 mb-6">Try adjusting your search filters</p>
            <button (click)="clearFilters()" class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
              Clear Filters
            </button>
          </div>
        } @else {
          @if (viewMode === 'grid') {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (unit of filteredUnits; track unit.id; let i = $index) {
                <div class="property-card group">
                  <div class="relative h-64 overflow-hidden">
                    <img 
                      [src]="propertyImages[i % propertyImages.length]" 
                      [alt]="unit.tower_name + ' - ' + unit.unit_number"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      (error)="onImageError($event)"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    @if (unit.is_available) {
                      <div class="absolute top-5 left-5 px-4 py-2 bg-green-500/90 backdrop-blur-md rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Available
                      </div>
                    } @else {
                      <div class="absolute top-5 left-5 px-4 py-2 bg-red-500/90 backdrop-blur-md rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                        </svg>
                        Occupied
                      </div>
                    }
                    <div class="absolute top-5 right-5 glass-effect px-4 py-2 rounded-xl">
                      <div class="text-2xl font-extrabold gradient-text">{{ '₹' + unit.rent }}</div>
                      <div class="text-xs text-gray-600 font-medium">per month</div>
                    </div>
                    <div class="absolute bottom-6 left-6 right-6 text-white">
                      <h3 class="text-3xl font-extrabold mb-1 text-shadow-lg">{{ unit.tower_name }}</h3>
                      <p class="text-lg font-semibold opacity-90">{{ unit.unit_number }}</p>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                      <div class="flex items-center space-x-2 text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span class="font-semibold">{{ unit.bedrooms }} Bed</span>
                      </div>
                      <div class="flex items-center space-x-2 text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                        <span class="font-semibold">{{ unit.bathrooms }} Bath</span>
                      </div>
                      <div class="flex items-center space-x-2 text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                        </svg>
                        <span class="font-semibold">{{ unit.area }} sqft</span>
                      </div>
                    </div>
                    <div class="mb-6">
                      <p class="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Amenities</p>
                      <div class="flex flex-wrap gap-2">
                        @for (amenity of unit.amenities.slice(0, 3); track amenity) {
                          <span class="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100">
                            {{ amenity }}
                          </span>
                        }
                        @if (unit.amenities.length > 3) {
                          <span class="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            +{{ unit.amenities.length - 3 }}
                          </span>
                        }
                      </div>
                    </div>
                    @if (unit.is_available && authService.isAuthenticated()) {
                      <button
                        (click)="requestBooking(unit.id)"
                        [disabled]="bookingUnitId === unit.id"
                        class="w-full btn-primary py-3.5 disabled:opacity-50"
                      >
                        @if (bookingUnitId === unit.id) {
                          <span class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Requesting...
                          </span>
                        } @else {
                          Request Booking
                        }
                      </button>
                    } @else if (!authService.isAuthenticated()) {
                      <a routerLink="/login" class="block w-full text-center btn-primary py-3.5">
                        Login to Book
                      </a>
                    } @else {
                      <button disabled class="w-full bg-gray-200 text-gray-500 py-3.5 rounded-xl cursor-not-allowed font-semibold">
                        Not Available
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="space-y-6">
              @for (unit of filteredUnits; track unit.id; let i = $index) {
                <div class="property-card">
                  <div class="md:flex">
                    <div class="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                      <img 
                        [src]="propertyImages[i % propertyImages.length]" 
                        [alt]="unit.tower_name + ' - ' + unit.unit_number"
                        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        (error)="onImageError($event)"
                      />
                      <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                      <div class="absolute top-4 left-4">
                        @if (unit.is_available) {
                          <span class="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Available
                          </span>
                        } @else {
                          <span class="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
                            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                            </svg>
                            Occupied
                          </span>
                        }
                      </div>
                    </div>
                    <div class="md:w-2/3 p-6">
                      <div class="flex justify-between items-start mb-4">
                        <div>
                          <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ unit.tower_name }} - {{ unit.unit_number }}</h3>
                          <div class="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <span class="flex items-center gap-1.5">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                              </svg>
                              {{ unit.bedrooms }} Bed
                            </span>
                            <span class="flex items-center gap-1.5">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                              </svg>
                              {{ unit.bathrooms }} Bath
                            </span>
                            <span class="flex items-center gap-1.5">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                              </svg>
                              {{ unit.area }} sqft
                            </span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-3xl font-bold gradient-text">{{ '₹' + unit.rent }}</div>
                          <div class="text-sm text-gray-600">per month</div>
                        </div>
                      </div>
                      <div class="mb-4">
                        <div class="flex flex-wrap gap-2">
                          @for (amenity of unit.amenities; track amenity) {
                            <span class="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100">{{ amenity }}</span>
                          }
                        </div>
                      </div>
                      @if (unit.is_available && authService.isAuthenticated()) {
                        <button
                          (click)="requestBooking(unit.id)"
                          [disabled]="bookingUnitId === unit.id"
                          class="px-6 py-2.5 btn-primary disabled:opacity-50"
                        >
                          Request Booking
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        }
      </div>

      <app-footer></app-footer>
    </div>
  `
})
export class UnitsComponent implements OnInit {
  allUnits: any[] = [];
  filteredUnits: any[] = [];
  loading = true;
  bookingUnitId: number | null = null;
  searchQuery = '';
  filterBedrooms = '';
  sortBy = 'rent-asc';
  viewMode: 'grid' | 'list' = 'grid';

  // Professional property images from Unsplash - Working URLs
  propertyImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80', // Modern luxury apartment
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80', // Contemporary apartment
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=80', // High-rise apartment
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80', // Modern apartment complex
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80', // Luxury residential
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop&q=80', // Premium apartment
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80', // Modern living space
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&q=80', // Luxury apartment interior
    'https://images.unsplash.com/photo-1600210492486-724fe5c67a0c?w=800&h=600&fit=crop&q=80', // Contemporary living
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&q=80'  // Modern apartment
  ];

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tower']) this.searchQuery = params['tower'];
      if (params['bedrooms']) this.filterBedrooms = params['bedrooms'];
      if (params['maxRent']) {
        // Handle max rent filter
      }
      this.loadUnits();
    });
  }

  loadUnits() {
    this.loading = true;
    this.apiService.getUnits().subscribe({
      next: (data) => {
        this.allUnits = data;
        this.filterUnits();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterUnits() {
    let filtered = [...this.allUnits];

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(unit =>
        unit.tower_name.toLowerCase().includes(query) ||
        unit.unit_number.toLowerCase().includes(query)
      );
    }

    // Bedroom filter
    if (this.filterBedrooms) {
      filtered = filtered.filter(unit => unit.bedrooms.toString() === this.filterBedrooms);
    }

    // Sort
    filtered.sort((a, b) => {
      if (this.sortBy === 'rent-asc') return a.rent - b.rent;
      if (this.sortBy === 'rent-desc') return b.rent - a.rent;
      if (this.sortBy === 'area-asc') return a.area - b.area;
      if (this.sortBy === 'area-desc') return b.area - a.area;
      return 0;
    });

    this.filteredUnits = filtered;
  }

  clearFilters() {
    this.searchQuery = '';
    this.filterBedrooms = '';
    this.sortBy = 'rent-asc';
    this.filterUnits();
  }

  requestBooking(unitId: number) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.bookingUnitId = unitId;
    this.apiService.createBooking(unitId).subscribe({
      next: () => {
        alert('Booking request submitted successfully!');
        this.bookingUnitId = null;
        this.loadUnits();
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to submit booking request');
        this.bookingUnitId = null;
      }
    });
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80';
    }
  }
}
