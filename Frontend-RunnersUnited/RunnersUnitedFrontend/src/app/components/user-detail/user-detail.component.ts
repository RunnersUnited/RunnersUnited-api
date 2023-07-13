import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userDetails!: Usuario;
  idUsuario: number | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const idUsuarioParam = params.get('id');
      if (idUsuarioParam !== null) {
        this.idUsuario = parseInt(idUsuarioParam, 10);
        console.log('ID del usuario:', this.idUsuario);
        this.fetchUserDetails(this.idUsuario);
      }
    });
  }

  fetchUserDetails(idUsuario: number): void {
    this.usuarioService.obtenerUsuarioPorID(idUsuario).subscribe((data: any) => {
      this.userDetails = data['body'];
      console.log('Cuerpo del usuario:', this.userDetails);
    });
  }

  verRutina(): void {
    const id = this.idUsuario;
    console.log('Ver rutina ID:', id);
    if (id !== null) {
      this.router.navigate(['detail/mis-rutinas', id]);
    }
  }

  registrarTiempo(): void {
    const id = this.idUsuario;
    if (id !== null) {
      this.router.navigate(['detail/register-tiempo', id]);
    }
  }

  verTiempo(): void {
    const id = this.idUsuario;
    console.log('Ver tiempo ID:', id);
    if (id !== null) {
      this.router.navigate(['detail/mis-tiempos', id]);
    }
  }
}
