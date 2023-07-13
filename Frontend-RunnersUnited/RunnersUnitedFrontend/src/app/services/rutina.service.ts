import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rutina } from '../models/rutina.model';
import { environment } from "../components/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  private apiBase: string = environment.apiBase;

  constructor(private http: HttpClient) { }

  registrarRutina(rutina: Rutina): Observable<{ idRutina: number }> {
    console.log(rutina);
    return this.http.post<{ idRutina: number }>(`${this.apiBase}/rutinas`, rutina);
  }

  obtenerRutinaPorID(idRutina: number) {
    return this.http.get<Rutina>(`${this.apiBase}/rutinas/${idRutina}`);
  }

  obtenerRutinaPorIDUsuario(idUsuario: number) {
    return this.http.get<Rutina[]>(`${this.apiBase}/rutinas/usuario/${idUsuario}`);
  }

  actualizarProgreso(idRutina: number, progreso: number): Observable<{ idRutina: number }> {
    const url = `${this.apiBase}/rutinas/${idRutina}`;
    const body = { progreso };

    return this.http.put<{ idRutina: number }>(url, body);
  }


  getAllRutinas() {
    return this.http.get<Rutina[]>(`${this.apiBase}/rutinas`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBase}/rutinas/${id}`);
  }
}
