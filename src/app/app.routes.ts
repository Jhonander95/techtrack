import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderInputComponent } from './components/order-input/order-input.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'input', component: OrderInputComponent },
  { path: 'sumary', component: OrderSummaryComponent },
  { path: '**', redirectTo: '' }    
];
