import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = "http://localhost:8080/runnersunited";
  constructor(private http: HttpClient) { }

  getAllMemebers(){
    return this.http.get<Usuario[]>(this.baseApiUrl +'/api/Gym');
    }
  addMember(usuario : any){
    return this.http.post<any>(this.baseApiUrl + '/api/Gym',usuario);
  }
  updateMember(id: string, usuario: Usuario) {
    return this.http.put<Usuario>(this.baseApiUrl + '/api/Gym/' + id, usuario);
  }
  deleteMember(id: string) {
  return this.http.delete<Usuario>(this.baseApiUrl + '/api/Gym/' + id);}

  getMember(id: string){
    return this.http.get<Usuario>(this.baseApiUrl +'/api/Gym/' + id);
    }

}
