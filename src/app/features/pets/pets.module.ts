import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsPageComponent } from './components/pets-page/pets-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PetsTableComponent } from './components/pets-table/pets-table.component';

const routes: Routes = [
  {
    path: '',
    component: PetsPageComponent
  }
];

@NgModule({
  declarations: [PetsPageComponent, PetsTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class PetsModule {}
