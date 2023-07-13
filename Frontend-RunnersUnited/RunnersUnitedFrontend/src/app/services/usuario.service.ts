import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import {environment} from "../components/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiBase: string=environment.apiBase;

  constructor(private http:HttpClient) { }
  signIn(usuario:any){
    console.log(usuario);

    return this.http.post<any>(this.apiBase+'/usuarios/login', usuario);
  }
  register(usuario: Usuario): Observable<{ idUsuario: number }> {
    console.log(usuario);
    return this.http.post<{ idUsuario: number }>(this.apiBase + '/usuarios', usuario);
  }

  obtenerUsuarioPorID(idUsuario: number) {
    return this.http.get<Usuario>(`${this.apiBase}/usuarios/${idUsuario}`);
  }

  getAllUsuarios() {
    return this.http.get<Usuario[]>(`${this.apiBase}/usuarios/clientes`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBase}/usuarios/${id}`);
  }

}

