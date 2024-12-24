import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private firestore: Firestore) { }

  // Método para obtener datos de la base de datos que coincidan con la semana actual
  getCurrentWeekData(): Observable<any[]> {
    const startOfWeek = this.getStartOfWeek();
    const endOfWeek = this.getEndOfWeek();
    const collectionRef = collection(this.firestore, 'orders');
    const q = query(collectionRef, where('createdAt', '>=', startOfWeek), where('createdAt', '<=', endOfWeek));

    return from(getDocs(q)).pipe(map(snapshot => snapshot.docs.map(doc => doc.data())));
  }

  // Función para obtener el inicio de la semana actual
  private getStartOfWeek(): Date {
    const date = new Date();
    const day = date.getDay(); // 0 = domingo, 1 = lunes, etc.
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para el inicio de la semana
    return new Date(date.setDate(diff));
  }

  // Función para obtener el final de la semana actual
  private getEndOfWeek(): Date {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() + (day === 0 ? 0 : 7 - day); // Ajuste para el final de la semana
    return new Date(date.setDate(diff));
  }
}
