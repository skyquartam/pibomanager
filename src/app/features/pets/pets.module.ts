import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsPageComponent } from './components/pets-page/pets-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PetsPageComponent
  }
];

@NgModule({
  declarations: [PetsPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PetsModule {}
