import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private af: AngularFirestore) {}

  public getCollection<T, U>(path: string, refPath?: string): Observable<T[]> {
    return this.af
      .collection<T>(path)
      .snapshotChanges()
      .pipe(
        map(c =>
          c.map(d => {
            return {
              ...d.payload.doc.data(),
              id: d.payload.doc.id
            };
          })
        ),
        concatMap(p => {
          if (refPath) {
            return from(
              Promise.all(
                p
                  .map(pet => {
                    const ref = pet[refPath] as DocumentReference;
                    return ref;
                  })
                  .map(ref => ref.get())
              )
            ).pipe(
              map(resolved =>
                resolved.map(r => {
                  return { ...r.data(), id: r.id };
                })
              ),
              map(res => {
                return p.map((o, i) => {
                  o[refPath] = (res[i] as unknown) as U;
                  return o;
                });
              })
            );
          } else {
            return of(p);
          }
        })
      );
  }
}
