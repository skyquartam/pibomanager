import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Pet, Owner } from '../../../../shared/models/models';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PetFormComponent } from '../pet-form/pet-form.component';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.scss']
})
export class PetsPageComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  petSub: Subscription;
  onwerSub: Subscription;
  owners: Owner[] = [];

  constructor(private titleService: TitleService, private firestore: FirestoreService, public dialog: MatDialog) {}

  ngOnInit() {
    this.titleService.title = 'Pets';
    this.titleService.subtitle = 'Track your pets';
    this.petSub = this.firestore.getCollection<Pet, Owner>('/pets', 'owner').subscribe(pets => (this.pets = pets));
    this.onwerSub = this.firestore.getCollection<Owner, null>('/owners').subscribe(owners => (this.owners = owners));
  }

  ngOnDestroy() {
    this.petSub.unsubscribe();
    this.onwerSub.unsubscribe();
  }

  onClickedPet(pet: Pet) {
    const dialogRef = this.dialog.open(PetFormComponent, {
      minWidth: '80vw',
      data: { pet: { ...pet }, owners: this.owners }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(`New pet: `, data);
    });
  }
}
