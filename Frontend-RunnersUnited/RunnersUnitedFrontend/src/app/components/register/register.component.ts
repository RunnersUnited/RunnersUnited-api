import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public tipos: string[] = ["Principiante", "Intermedio", "Avanzado"];
  public generos: string[] = ["Hombre", "Mujer"];

  showPassword: boolean = false;
  public registerForm!: FormGroup;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    public usuario: UsuarioService,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: [''],
      contrasenaUsuario: [''],
      correoUsuario: [''],
      edad: [''],
      tipo: [''],
      genero: [''],
      estado: [''],
      imc: [''],
      altura: [''],
      peso: ['']
    });

    this.registerForm.controls['altura'].valueChanges.subscribe(res => {
      this.calcularIMC(res);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  registrar() {
    const usuario = { ...this.registerForm.value, rol: { idRol: 2 } } as Usuario;

    this.usuario.register(usuario).subscribe(
      (response: { idUsuario: number }) => {
        const idUsuarioGenerado = response.idUsuario;

        console.log('ID de usuario:', idUsuarioGenerado); // Imprimir el idUsuario en la consola

        this.toast.success({ detail: 'Success', summary: 'Usuario registrado!', duration: 3000 });

        this.router.navigateByUrl('/login'); // Redirigir al usuario a la página de inicio de sesión
      },
      error => {
        console.error(error);
        // Manejar el error adecuadamente, mostrar un mensaje de error o tomar medidas según sea necesario.
      }
    );
  }


  calcularIMC(alturaValor: number) {
    const peso = this.registerForm.value.peso;
    const altura = alturaValor;
    const imc = Number((peso / (altura * altura)).toFixed(2));
    this.registerForm.controls['imc'].patchValue(imc);

    switch (true) {
      case isNaN(imc) || imc < 18.5:
        this.registerForm.controls['estado'].patchValue('Poco Peso');
        break;
      case imc >= 18.5 && imc < 25:
        this.registerForm.controls['estado'].patchValue('Normal');
        break;
      case imc >= 25 && imc < 30:
        this.registerForm.controls['estado'].patchValue('Sobre Peso');
        break;
      default:
        this.registerForm.controls['estado'].patchValue('Obeso');
        break;
    }
  }
}
