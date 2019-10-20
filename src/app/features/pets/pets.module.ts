import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsPageComponent } from './components/pets-page/pets-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PetsTableComponent } from './components/pets-table/pets-table.component';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PetsPageComponent
  }, {
    path: ':id',
    component: PetsPageComponent
  }
];

@NgModule({
  declarations: [PetsPageComponent, PetsTableComponent, PetFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  entryComponents: [PetFormComponent]
})
export class PetsModule {}
