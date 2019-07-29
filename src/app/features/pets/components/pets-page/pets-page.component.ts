import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Pet } from '../../../../shared/models/Pet';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.scss']
})
export class PetsPageComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  dataSub: Subscription;

  constructor(private titleService: TitleService, private firestore: FirestoreService) {}

  ngOnInit() {
    this.titleService.title = 'Pets';
    this.titleService.subtitle = 'Track your pets';
    this.dataSub = this.firestore.getCollection<Pet>('/pets').subscribe(pets => (this.pets = pets));
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
