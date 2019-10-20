import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Pet, Owner } from '../../../../shared/models/models';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { take } from 'rxjs/operators';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

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

  constructor(
    private titleService: TitleService,
    private firestore: FirestoreService,
    public dialog: MatDialog,
    private af: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.titleService.title = 'Pets';
    this.titleService.subtitle = 'Track your pets';
    this.petSub = this.firestore.getCollection<Pet, Owner>('/pets', 'owner').subscribe(pets => {
      this.pets = pets;
      this.checkForPetId()
    });
    this.onwerSub = this.firestore.getCollection<Owner, null>('/owners').subscribe(owners => (this.owners = owners));
  }

  private checkForPetId() {
    this.activatedRoute.paramMap.subscribe(pp => {
      if (pp.has('id')) {
        const petId = pp.get('id');
        console.log('Received ID ', petId);
        const selectedPet = this.pets.filter(p => p.id === petId)[0]
        if (selectedPet) {
          this.onClickedPet(selectedPet);
        };
      }
    });
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
    dialogRef.afterClosed().subscribe((data: Pet) => {
      if (data) {
        console.log(`Received pet from form `, data);
        this.firestore.updateDoc(`/pets/${pet.id}`, data).subscribe(() => {
          const oldOwner = this.af.doc<Owner>(`/owners/${pet.owner.id}`);
          oldOwner
            .get()
            .pipe(take(1))
            .subscribe(oldOwnerData => {
              const value = oldOwnerData.data();
              this.af.doc(`/owners/${pet.owner.id}`).update({
                pets: value.pets.filter(p => p.id !== pet.id)
              });
              (data.owner as DocumentReference).update({
                pets: [this.af.doc(`/pets/${pet.id}`).ref]
              });
            });
        });
      }
    });
  }
}
