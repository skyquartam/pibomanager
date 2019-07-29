import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Pet } from '../../../../shared/models/Pet';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss']
})
export class PetsTableComponent implements OnInit, OnChanges {
  @Input() pets: Pet[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  displayedColumns = ['edit', 'name', 'microchip'];
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
    console.log({ a, b });
    return true;
  }

  openDialog(pet: Pet) {
    console.log(`Open Dialog for ${pet.name}`);
  }
}
