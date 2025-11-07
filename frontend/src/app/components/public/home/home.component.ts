import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <app-header></app-header>

      <!-- Hero Section with Premium Design and Background Slider -->
      <section class="relative overflow-hidden min-h-[85vh] flex items-center">
        <!-- Background Image Slider -->
        <div class="absolute inset-0 overflow-hidden">
          @for (bgImage of backgroundImages; track bgImage; let i = $index) {
            <div 
              class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              [class.opacity-100]="currentBgIndex === i"
              [class.opacity-0]="currentBgIndex !== i"
              [class.z-0]="currentBgIndex === i"
              [class.z-[-1]]="currentBgIndex !== i"
            >
              <img 
                [src]="bgImage" 
                [alt]="'Luxury apartment background ' + (i + 1)"
                class="w-full h-full object-cover scale-110"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-pink-900/90"></div>
            </div>
          }
          
          <!-- Animated Blob Shapes Overlay -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
            
            <!-- Geometric Shapes -->
            <div class="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-3xl rotate-45 blur-xl animate-pulse"></div>
            <div class="absolute bottom-32 left-32 w-24 h-24 bg-purple-300/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
            <div class="absolute top-1/3 right-1/4 w-40 h-40 bg-indigo-300/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
          </div>
          
          <!-- Grid Pattern Overlay -->
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <!-- Gradient Overlay for Better Text Readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
          
          <!-- Slider Indicators -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-3">
            @for (bgImage of backgroundImages; track bgImage; let i = $index) {
              <button type="button" (click)="currentBgIndex = i" [class]="'w-3 h-3 rounded-full transition-all duration-300 ' + (currentBgIndex === i ? 'bg-white w-8' : 'bg-white/40')" [attr.aria-label]="'Go to slide ' + (i + 1)">
                <span class="sr-only">Slide {{ i + 1 }}</span>
              </button>
            }
          </div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 z-10">
          <div class="text-center mb-16 animate-fade-in">
            <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="text-sm font-semibold text-white/90">Trusted by 10,000+ Residents</span>
            </div>
            <h1 class="text-6xl md:text-8xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
              Find Your
              <span class="block mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent text-shadow-lg">
                Dream Home
              </span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-200/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Discover premium apartments with world-class amenities. Experience luxury living in the most desirable locations.
            </p>
          </div>

          <!-- Premium Search Bar -->
          <div class="max-w-6xl mx-auto animate-slide-up">
            <div class="glass-effect rounded-3xl shadow-2xl p-8 md:p-10 border border-white/10">
              <form (ngSubmit)="onSearch()" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                      <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Location / Tower
                    </label>
                    <div class="relative">
                      <input
                        [(ngModel)]="searchFilters.tower"
                        name="tower"
                        type="text"
                        placeholder="Search by tower name..."
                        class="input-field w-full pl-12"
                      />
                      <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                      <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      Bedrooms
                    </label>
                    <select
                      [(ngModel)]="searchFilters.bedrooms"
                      name="bedrooms"
                      class="input-field w-full"
                    >
                      <option value="">Any</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4+ Bedrooms</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-gray-800 mb-3 flex items-center">
                      <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Max Rent
                    </label>
                    <input
                      [(ngModel)]="searchFilters.maxRent"
                      name="maxRent"
                      type="number"
                      placeholder="Enter amount..."
                      class="input-field w-full"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    class="flex-1 btn-primary text-lg py-4 px-8"
                  >
                    <span class="flex items-center justify-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      Search Properties
                    </span>
                  </button>
                  <button
                    type="button"
                    (click)="clearFilters()"
                    class="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Premium Stats Section -->
      <section class="relative -mt-16 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="stat-card group cursor-pointer">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                {{ stats.totalUnits || 0 }}+
              </div>
              <div class="text-sm font-semibold text-gray-600 uppercase tracking-wider">Properties</div>
            </div>
            <div class="stat-card group cursor-pointer">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                {{ stats.availableUnits || 0 }}+
              </div>
              <div class="text-sm font-semibold text-gray-600 uppercase tracking-wider">Available Now</div>
            </div>
            <div class="stat-card group cursor-pointer">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">
                {{ stats.amenities || 0 }}+
              </div>
              <div class="text-sm font-semibold text-gray-600 uppercase tracking-wider">Amenities</div>
            </div>
            <div class="stat-card group cursor-pointer">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div class="text-sm font-semibold text-gray-600 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Properties -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center mb-16">
          <div class="inline-block mb-4 px-4 py-2 bg-indigo-100 rounded-full">
            <span class="text-sm font-bold text-indigo-600 uppercase tracking-wider">Featured</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Premium Properties
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked selections showcasing the finest in luxury living</p>
        </div>
        
        @if (featuredUnits.length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            @for (unit of featuredUnits.slice(0, 3); track unit.id; let i = $index) {
              <div class="property-card animate-slide-up" [style.animation-delay.ms]="i * 100">
                <div class="relative h-64 overflow-hidden">
                  <img 
                    [src]="propertyImages[i % propertyImages.length]" 
                    [alt]="unit.tower_name + ' - ' + unit.unit_number"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    (error)="onImageError($event)"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div class="absolute inset-0 shimmer"></div>
                  @if (unit.is_available) {
                    <div class="absolute top-5 left-5 px-4 py-2 bg-green-500/90 backdrop-blur-md rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      Available
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
                  <a routerLink="/units" class="block w-full text-center btn-primary py-3.5">
                    View Details
                    <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            }
          </div>
        }
        
        <div class="text-center">
          <a routerLink="/units" class="inline-flex items-center px-8 py-4 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore All Properties
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </section>

      <!-- Premium Amenities -->
      <section class="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <div class="inline-block mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200">
              <span class="text-sm font-bold text-indigo-600 uppercase tracking-wider">Amenities</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              World-Class Amenities
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for a premium lifestyle</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            @for (amenity of amenities; track amenity.id; let i = $index) {
              <div class="card-premium p-6 text-center group hover:scale-105 transition-all duration-500 animate-scale-in" [style.animation-delay.ms]="i * 50">
                <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2 text-sm">{{ amenity.name }}</h4>
                <p class="text-xs text-gray-600 leading-relaxed">{{ amenity.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Why Choose Us?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Experience the difference of premium service</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-premium p-10 text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-extrabold text-gray-900 mb-4">Verified Properties</h3>
            <p class="text-gray-600 leading-relaxed">All properties undergo rigorous verification and quality inspection</p>
          </div>
          <div class="card-premium p-10 text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-extrabold text-gray-900 mb-4">Instant Booking</h3>
            <p class="text-gray-600 leading-relaxed">Book your dream home in minutes with our streamlined process</p>
          </div>
          <div class="card-premium p-10 text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg class="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-extrabold text-gray-900 mb-4">Premium Experience</h3>
            <p class="text-gray-600 leading-relaxed">Luxury living with world-class amenities and exceptional service</p>
          </div>
        </div>
      </section>

      <app-footer></app-footer>
    </div>
  `
})
export class HomeComponent implements OnInit {
  amenities: any[] = [];
  featuredUnits: any[] = [];
  stats = {
    totalUnits: 0,
    availableUnits: 0,
    amenities: 0
  };
  
  searchFilters = {
    tower: '',
    bedrooms: '',
    maxRent: ''
  };

  // Background slider images - High-quality luxury apartment images
  backgroundImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=85', // Modern luxury apartment exterior
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=85', // Contemporary apartment building
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=85', // High-rise luxury apartments
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=85', // Modern apartment complex
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=85'  // Luxury residential building
  ];
  
  currentBgIndex = 0;
  
  // Professional property images from Unsplash - Working URLs
  propertyImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80', // Modern luxury apartment
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80', // Contemporary apartment
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=80', // High-rise apartment
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80', // Modern apartment complex
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80', // Luxury residential
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop&q=80', // Premium apartment
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80', // Modern living space
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&q=80'  // Luxury apartment interior
  ];

  constructor(
    public authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
    this.startBackgroundSlider();
  }
  
  startBackgroundSlider() {
    setInterval(() => {
      this.currentBgIndex = (this.currentBgIndex + 1) % this.backgroundImages.length;
    }, 5000); // Change background every 5 seconds
  }

  loadData() {
    this.apiService.getAmenities().subscribe(data => {
      this.amenities = data;
      this.stats.amenities = data.length;
    });
    
    this.apiService.getUnits().subscribe(data => {
      this.featuredUnits = data;
      this.stats.totalUnits = data.length;
      this.stats.availableUnits = data.filter((u: any) => u.is_available).length;
    });
  }

  onSearch() {
    const queryParams: any = {};
    if (this.searchFilters.tower) queryParams.tower = this.searchFilters.tower;
    if (this.searchFilters.bedrooms) queryParams.bedrooms = this.searchFilters.bedrooms;
    if (this.searchFilters.maxRent) queryParams.maxRent = this.searchFilters.maxRent;
    
    this.router.navigate(['/units'], { queryParams });
  }

  clearFilters() {
    this.searchFilters = { tower: '', bedrooms: '', maxRent: '' };
  }
  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80';
    }
  }
}
