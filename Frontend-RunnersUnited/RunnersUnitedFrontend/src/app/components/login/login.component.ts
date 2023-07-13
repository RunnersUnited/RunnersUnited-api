import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {} as Usuario;
  msg = '';
  id: any;

  constructor(private service: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.usuario.correoUsuario == null || this.usuario.contrasenaUsuario == null) {
      this.msg = "Rellena tus datos";
    } else {
      this.service.signIn(this.usuario)
        .subscribe(
          res => {
            console.log(res);
            var idRol = res.body.rol.idRol;
            console.log(idRol);
            this.id = res.body.id;
            console.log('ID de usuario:', this.id);
            sessionStorage.setItem('key', this.id);
            console.log('Valor almacenado en sessionStorage:', sessionStorage.getItem('key'));

            const { idUsuario } = res.body;
            console.log('ID de usuario destructurado:', idUsuario);

            if (idRol == 2) {
              if (this.id !== undefined) {
                this.router.navigate(['detail', this.id]); // Corrección en la navegación
                sessionStorage.setItem('idUsuario', idUsuario);
              } else {
                // Manejo de error: this.id es undefined
              }
            } else {
              this.router.navigate(['/admin/list']);
              sessionStorage.setItem('idUsuario', idUsuario);
            }
          },
          err => {
            console.log(err);
            this.msg = "Correo o contraseña incorrectos.";
          }
        );
    }
  }
}
