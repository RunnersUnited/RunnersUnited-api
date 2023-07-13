import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Rutina } from 'src/app/models/rutina.model';
import { RutinaService } from '../../services/rutina.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario.model";

@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.scss']
})
export class CrearRutinaComponent implements OnInit {
  public ejercicios: string[] = [
    "Rutina personalizada: Principiante - 10 minutos trote - 10 min zancadas - 5 min sprintear - 20 jumping jacks",
    "Rutina personalizada: Principiante - 20 minutos trote - 5 min elevaciones de talones - 10 min bicicleta estática - 25 fondos de tríceps",
    "Rutina personalizada: Principiante - 15 minutos trote - 10 min puente de glúteos - 5 min saltar la comba - 30 crunches",
    "Rutina personalizada: Intermedio - 30 minutos trote - 10 min skipping - 15 min flexiones - 35 lunges",
    "Rutina personalizada: Intermedio - 20 minutos trote - 15 min escalón - 10 min plancha lateral - 45 patadas de glúteos",
    "Rutina personalizada: Intermedio - 25 minutos trote - 10 min salto de estrella - 20 min rodillas al pecho - 40 elevaciones de piernas",
    "Rutina personalizada: Avanzado - 40 minutos trote - 15 min saltos de tijera - 25 min abdominales en V - 60 squats",
    "Rutina personalizada: Avanzado - 30 minutos trote - 20 min subir y bajar escaleras - 15 min flexiones con palmada - 50 rodillas al codo",
    "Rutina personalizada: Avanzado - 35 minutos trote - 10 min salto al cajón - 30 min plancha con rotación - 40 push-ups"
  ];

  public rutinaForm!: FormGroup;
  public nivelRutina: string = '';

  constructor(
    private fb: FormBuilder,
    public rutinaService: RutinaService,
    private toast: NgToastService,
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rutinaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      nivel: [''],
      fechaFin: [''],
      progreso: [0]
    });

    const idUsuario = this.route.snapshot.paramMap.get('id');

    this.usuarioService.obtenerUsuarioPorID(Number(idUsuario)).subscribe(
      (usuario: Usuario) => {
        console.log('Body del usuario:', usuario);
        usuario = (usuario as any).body;

        console.log(usuario['nombre']);
        this.nivelRutina = usuario.tipo;
        this.rutinaForm.patchValue({ nivel: this.nivelRutina });
        console.log('Nivel Rutina:', this.nivelRutina);
      },
      error => {
        console.error(error);
      }
    );
  }

  get rutinasPersonalizadas(): string[] {
    return this.ejercicios.filter(rutina => rutina.includes(`Rutina personalizada: ${this.nivelRutina}`));
  }

  registrarRutina() {
    const fechaFin = this.rutinaForm.value.fechaFin;
    const fechaFormateada = this.formatoFecha(fechaFin);

    const rutina = {
      ...this.rutinaForm.value,
      usuario: { id: Number(this.route.snapshot.paramMap.get('id')) },
      fechaFin: fechaFormateada
    } as Rutina;

    this.rutinaService.registrarRutina(rutina).subscribe(
      (response: { idRutina: number }) => {
        const idRutinaGenerada = response.idRutina;

        console.log('ID de rutina:', idRutinaGenerada);

        this.toast.success({ detail: 'Success', summary: 'Rutina registrada!', duration: 3000 });

        this.router.navigateByUrl('/admin/list');
      },
      error => {
        console.error(error);
      }
    );
  }

  private formatoFecha(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();

    return `${diaFormateado}/${mesFormateado}/${año}`;
  }
}
