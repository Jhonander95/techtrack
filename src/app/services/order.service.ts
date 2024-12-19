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

  // Método para guardar un objeto JSON en Firestore con la fecha actual
  saveData(data: any): Observable<string> {
    // Agregar un campo de fecha al objeto de datos
    const dataWithDate = {
      ...data,
      createdAt: new Date() // Agrega la fecha actual
    };

    const collectionRef = collection(this.firestore, 'orders'); 
    return from(addDoc(collectionRef, dataWithDate)).pipe(map(docRef => docRef.id));
  }
}
