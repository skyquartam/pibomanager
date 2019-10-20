import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { Pet } from '../../../../shared/models/models';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss']
})
export class PetsTableComponent implements OnInit, OnChanges {
  @Input() pets: Pet[] = [];
  @Output() clickedPet = new EventEmitter<Pet>();
  @Output() deletePet = new EventEmitter<Pet>();
  @Output() createPet = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  displayedColumns = ['edit', 'name', 'owner', 'microchip'];
  dataSource = new MatTableDataSource<Pet>([]);

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges({ pets }: SimpleChanges) {
    this.dataSource.data = pets.currentValue;
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  trackByUid(a, b) {
    return a.id === b.id;
  }

  openDialog(pet: Pet) {
    this.clickedPet.emit(pet);
  }

  openDeleteDialog(pet: Pet) {
    this.deletePet.emit(pet);
  }

  onCreate() {
    this.createPet.emit()
  }
}
