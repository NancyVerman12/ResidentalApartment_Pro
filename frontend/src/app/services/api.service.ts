import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Units
  getUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/units`);
  }

  // Amenities
  getAmenities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/amenities`);
  }

  // Bookings
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings`);
  }

  createBooking(unitId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, { unit_id: unitId });
  }

  approveBooking(bookingId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings/${bookingId}/approve`, {});
  }

  declineBooking(bookingId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings/${bookingId}/decline`, {});
  }

  // Admin - Units
  adminGetUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/units`);
  }

  adminCreateUnit(unit: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/units`, unit);
  }

  adminUpdateUnit(unitId: number, unit: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/units/${unitId}`, unit);
  }

  adminDeleteUnit(unitId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/units/${unitId}`);
  }

  // Admin - Amenities
  adminGetAmenities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/amenities`);
  }

  adminCreateAmenity(amenity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/amenities`, amenity);
  }

  // Admin - Reports
  getOccupancyReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/reports/occupancy`);
  }

  getPaymentsReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/reports/payments`);
  }

  // Admin - Tenants
  getTenants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/tenants`);
  }
}

