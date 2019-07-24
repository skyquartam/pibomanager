import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersPageComponent } from './components/owners-page/owners-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OwnersPageComponent
  }
];

@NgModule({
  declarations: [OwnersPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class OwnersModule {}
