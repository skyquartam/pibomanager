import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsPageComponent
  }
];

@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AnalyticsModule {}
