import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Pet, Owner } from '../../../../shared/models/models';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { Subscription, from } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { take } from 'rxjs/operators';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  isCheckingForId = false;

  constructor(
    private titleService: TitleService,
    private firestore: FirestoreService,
    public dialog: MatDialog,
    private af: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.titleService.title = 'Pets';
    this.titleService.subtitle = 'Track your pets';
    this.petSub = this.firestore.getCollection<Pet, Owner>('/pets', 'owner').subscribe(pets => {
      this.pets = pets;
      this.checkForPetId();
    });
    this.onwerSub = this.firestore.getCollection<Owner, null>('/owners').subscribe(owners => (this.owners = owners));
  }

  private checkForPetId() {
    if (!this.isCheckingForId) {
      this.isCheckingForId = true;
      this.activatedRoute.paramMap.subscribe(pp => {
        if (pp.has('id')) {
          const petId = pp.get('id');
          if (petId === 'create') {
            this.onCreate();
          } else {
            const selectedPet = this.pets.filter(p => p.id === petId)[0];
            if (selectedPet) {
              this.openEditForPet(selectedPet);
            }
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.petSub.unsubscribe();
    this.onwerSub.unsubscribe();
  }

  onDeletePet(pet: Pet) {
    alert('want to delete ' + pet.name);
  }

  onClickedPet(pet: Pet) {
    this.location.replaceState('/pets/' + pet.id);
    this.openEditForPet(pet);
  }

  onCreate() {
    const newPet = new Pet();
    this.location.replaceState('/pets/create');
    this.openEditForPet(newPet);
  }

  openEditForPet(pet: Pet) {
    const dialogRef = this.dialog.open(PetFormComponent, {
      minWidth: '80vw',
      data: { pet: { ...pet }, owners: this.owners }
    });
    dialogRef.afterClosed().subscribe((data: Pet) => {
      this.location.replaceState('/pets');
      if (data) {
        if (pet.id) {
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
        } else {
          from(this.af.collection<Pet>('/pets').add(data)).subscribe(ref => {
            ref.update({
              id: ref.id
            });
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
      }
    });
  }
}
