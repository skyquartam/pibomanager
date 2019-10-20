import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatPaginatorModule,
  MatStepperModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it' }]
})
export class MaterialModule {}
