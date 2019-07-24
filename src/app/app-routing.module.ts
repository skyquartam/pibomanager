import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './features/reception/reception.module#ReceptionModule'
  },
  {
    path: 'analytics',
    loadChildren: './features/analytics/analytics.module#AnalyticsModule'
  },
  {
    path: 'pets',
    loadChildren: './features/pets/pets.module#PetsModule'
  },
  {
    path: 'owners',
    loadChildren: './features/owners/owners.module#OwnersModule'
  },
  { path: 'reception', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
