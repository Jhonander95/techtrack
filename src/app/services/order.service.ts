import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  // Método para guardar un objeto JSON en Firestore
  saveData(data: any): Observable<string> {
    const collectionRef = collection(this.firestore, 'orders'); 
    return from(addDoc(collectionRef, data)).pipe(map(docRef => docRef.id));
  }
}
