import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Rutina } from '../../models/rutina.model';
import { RutinaService } from '../../services/rutina.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-progreso',
  templateUrl: './modificar-progreso.component.html',
  styleUrls: ['./modificar-progreso.component.scss']
})
export class ModificarProgresoComponent implements OnInit {
  public rutinaForm!: FormGroup;
  public valorSeleccionado: number | null = null;

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinaService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rutinaForm = this.fb.group({
      progreso: ['']
    });
  }

  establecerValor(valor: number) {
    this.valorSeleccionado = valor;
  }

  registrarProgreso() {
    if (this.valorSeleccionado === null) {
      // No se ha seleccionado ningún valor
      return;
    }

    const idRutina = this.route.snapshot.paramMap.get('id');
    const progreso = this.valorSeleccionado;

    const rutina: Rutina = {
      id: Number(idRutina),
      nombre: '',
      descripcion: '',
      nivel: '',
      fechaInicio: '',
      fechaFin: '',
      cantidadDias : 0,
      progreso,
      usuario: {}
    };

    this.rutinaService.actualizarProgreso(rutina.id, rutina.progreso).subscribe(
      (response: { idRutina: number }) => {
        const idRutinaActualizada = response.idRutina;
        console.log('ID de rutina actualizada:', idRutinaActualizada);

        this.toast.success({ detail: 'Success', summary: 'Progreso actualizado!', duration: 3000 });
        window.history.back(); // Retrocede a la página anterior
      },
      error => {
        console.error(error);
      }
    );
  }
}
