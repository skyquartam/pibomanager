import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionPageComponent } from './components/reception-page/reception-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReceptionPageComponent
  }
];

@NgModule({
  declarations: [ReceptionPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ReceptionModule {}
