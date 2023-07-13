import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; // Importa MatTableDataSource
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss']
})
export class RegisteredListComponent implements OnInit {

  userDetails: Usuario | undefined; // Agrega una variable para los detalles del usuario
  usuarios: Usuario[] = [];
  idUsuario: number | null = null;
  dataSource: MatTableDataSource<Usuario> | undefined; // Define el dataSource para la tabla

  constructor(private usuarioService: UsuarioService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsuarios();
    console.log(this.usuarios);
    console.log(sessionStorage.getItem('key'));
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe((data: any) => {
      this.usuarios = data['body']; // Asigna la lista de usuarios
      this.dataSource = new MatTableDataSource(this.usuarios); // Asigna el dataSource con los usuarios
    });
  }

  applyFilter(value: string) {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }

  eliminarUsuario(id: number) {
    console.log(id); // Verifica el valor del ID en la consola
    const ok = confirm('¿Estás seguro de eliminar el producto?');
    if (ok) {
      this.usuarioService.delete(id).subscribe(() => {
        this.getAllUsuarios();
      });
    }
  }


  crearRutina(id: number) {
    if (id !== undefined) {
      this.router.navigate(['admin/crear-rutina', id]);
    }
  }

  verRutina(id: number) {
    if (id !== undefined) {
      this.router.navigate(['admin/ver-rutinas', id]);
    }
  }

  verTiempo(id: number) {
    if (id !== undefined) {
      this.router.navigate(['admin/ver-tiempos', id]);
    }
  }


}
