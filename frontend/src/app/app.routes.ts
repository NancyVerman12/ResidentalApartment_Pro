import { Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { UnitsComponent } from './components/public/units/units.component';
import { BookingsComponent } from './components/public/bookings/bookings.component';
import { AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminUnitsComponent } from './components/admin/units/units.component';
import { AdminBookingsComponent } from './components/admin/bookings/bookings.component';
import { AdminReportsComponent } from './components/admin/reports/reports.component';
import { AdminTenantsComponent } from './components/admin/tenants/tenants.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'units', component: UnitsComponent, canActivate: [authGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/units', component: AdminUnitsComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/bookings', component: AdminBookingsComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/reports', component: AdminReportsComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/tenants', component: AdminTenantsComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '' }
];

