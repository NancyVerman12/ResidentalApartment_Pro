import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-24 overflow-hidden">
      <!-- Decorative gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-4 mb-6">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50"></div>
                <div class="relative w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-2xl font-extrabold text-white mb-1">ApartmentPortal</h3>
                <p class="text-sm text-gray-400">Premium Living Spaces</p>
              </div>
            </div>
            <p class="text-gray-400 mb-6 max-w-md leading-relaxed">
              Your trusted partner in finding the perfect home. We connect you with premium apartments and world-class amenities in the most desirable locations.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="group relative w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/50">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a href="#" class="group relative w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a href="#" class="group relative w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-600 hover:to-indigo-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h4>
            <ul class="space-y-3">
              <li><a routerLink="/units" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Browse Units</a></li>
              <li><a routerLink="/" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a routerLink="/" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Contact</a></li>
              <li><a routerLink="/register" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Register</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-bold text-lg mb-6 relative inline-block">
              Support
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
            </h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="#" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</a></li>
              <li><a href="#" class="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 inline-block">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800/50 mt-12 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm mb-4 md:mb-0">&copy; 2025 ApartmentPortal. All rights reserved.</p>
            <div class="flex items-center space-x-6 text-sm text-gray-400">
              <span class="flex items-center gap-1.5">
                
                Developed by Nancy Verma
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
