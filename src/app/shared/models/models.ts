import { DocumentReference } from '@angular/fire/firestore';

export interface BirthDate {
  seconds: number;
  nanoseconds: number;
}

export interface Pet {
  id: string;
  affinity: string;
  affinityHumans: boolean;
  affinityOther: string;
  allergies: string;
  awards: boolean;
  birthDate: BirthDate;
  breed: string;
  illnesses: string;
  kind: string;
  microchip: string;
  nMeals: number;
  nPensioni: number;
  name: string;
  notes: string;
  owner: DocumentReference | Owner;
  productName: string;
  sex: string;
  size: string;
  sofaBed: boolean;
  sterilization: boolean;
  therapy: string;
}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  pets: DocumentReference[] | Pet[];
}