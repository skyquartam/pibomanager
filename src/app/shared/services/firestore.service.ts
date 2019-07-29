import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private af: AngularFirestore) {}

  public getCollection<T>(path: string): Observable<T[]> {
    return this.af
      .collection<T>(path)
      .snapshotChanges()
      .pipe(map(c => c.map(d => d.payload.doc.data())));
  }
}
