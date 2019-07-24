import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/reception/reception.module').then(mod => mod.ReceptionModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./features/analytics/analytics.module').then(mod => mod.AnalyticsModule)
  },
  {
    path: 'pets',
    loadChildren: () => import('./features/pets/pets.module').then(mod => mod.PetsModule)
  },
  {
    path: 'owners',
    loadChildren: () => import('./features/owners/owners.module').then(mod => mod.OwnersModule)
  },
  { path: 'reception', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
