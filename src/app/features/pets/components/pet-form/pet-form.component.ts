import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MAT_DATEPICKER_VALIDATORS } from '@angular/material';
import { Pet, Owner } from '../../../../shared/models/models';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as moment from 'moment';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {
  form = new FormGroup({});
  pet: Pet;
  owners: Owner[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PetFormComponent>,
    private af: AngularFirestore
  ) {
    this.pet = { ...data.pet };
    this.owners = data.owners;
    console.log(`Received pet in form `, this.pet);
  }

  ngOnInit() {
    this.form = this.fb.group({
      general: this.fb.group({
        name: [this.pet.name, Validators.required],
        birthDate: [{ value: this.pet.birthDate.toDate(), disabled: true }, Validators.required],
        kind: [this.pet.kind, Validators.required],
        sex: [this.pet.sex, Validators.required],
        size: [this.pet.size, Validators.required],
        microchip: [this.pet.microchip]
      }),
      owner: this.fb.group({
        id: [(this.pet.owner && this.pet.owner.id) || '', Validators.required]
      }),
      health: this.fb.group({
        sterilization: this.pet.sterilization,
        illnesses: this.pet.illnesses,
        therapy: this.pet.therapy,
        allergies: this.pet.allergies,
        productName: this.pet.productName
      }),
      behavior: this.fb.group({
        nMeals: [this.pet.nMeals, Validators.min(0)],
        awards: this.pet.awards,
        affinity: this.pet.affinity,
        affinityOther: this.pet.affinityOther,
        affinityHumans: this.pet.affinityHumans,
        sofaBed: this.pet.sofaBed,
        notes: this.pet.notes
      })
    });
  }

  hasError(group: string, name: string, error: string) {
    return (this.form.get(group) as FormGroup).controls[name].hasError(error);
  }

  onSave() {
    const birthDateTimestamp = firebase.firestore.Timestamp.fromDate(
      moment(this.form.get('general').get('birthDate').value).toDate()
    );
    const ownerRef = this.af.doc<Owner>('/owners/' + this.form.get('owner').value.id).ref;
    const newPet = {
      ...this.form.get('general').value,
      birthDate: birthDateTimestamp,
      owner: ownerRef,
      ...this.form.get('health').value,
      ...this.form.get('behavior').value
    };
    this.dialogRef.close(newPet);
  }
}
