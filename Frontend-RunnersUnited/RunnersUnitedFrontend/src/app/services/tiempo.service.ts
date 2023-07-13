import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tiempo } from '../models/tiempo.model';
import { environment } from "../components/environments/environment";
import { Observable } from 'rxjs';
import {Rutina} from "../models/rutina.model";

@Injectable({
  providedIn: 'root'
})
export class TiempoService {
  private apiBase: string = environment.apiBase;

  constructor(private http: HttpClient) { }

  registrarTiempo(tiempo: Tiempo): Observable<{ idTiempo: number }> {
    return this.http.post<{ idTiempo: number }>(`${this.apiBase}/tiempos`, tiempo);
  }

  obtenerTiempoPorID(idTiempo: number): Observable<Tiempo> {
    return this.http.get<Tiempo>(`${this.apiBase}/tiempos/${idTiempo}`);
  }

  getAllTiempos(): Observable<Tiempo[]> {
    return this.http.get<Tiempo[]>(`${this.apiBase}/tiempos`);
  }

  obtenerTiempoPorIDUsuario(idUsuario: number) {
    return this.http.get<Tiempo[]>(`${this.apiBase}/tiempos/usuario/${idUsuario}`);
  }

  delete(idTiempo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/tiempos/${idTiempo}`);
  }
}
