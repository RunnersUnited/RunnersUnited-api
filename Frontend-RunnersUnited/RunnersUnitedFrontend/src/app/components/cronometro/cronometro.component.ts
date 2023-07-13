import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { interval } from 'rxjs';
import { Tiempo } from 'src/app/models/tiempo.model';
import { TiempoService } from 'src/app/services/tiempo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss']
})
export class CronometroComponent implements OnInit {
  tiempo: Tiempo = {
    id: 0,
    duracion: '00:00:00',
    usuario: Object
  };
  running: boolean = false;
  cronometro: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private tiempoService: TiempoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const usuarioId = params['id'];
      this.tiempo.usuario = { id: usuarioId };
    });
  }

  convertirDuracion(duracion: number): string {
    const horas = Math.floor(duracion / 3600);
    const minutos = Math.floor((duracion % 3600) / 60);
    const segundos = duracion % 60;

    return `${this.agregarCero(horas)}:${this.agregarCero(minutos)}:${this.agregarCero(segundos)}`;
  }

  agregarCero(valor: number): string {
    return valor < 10 ? `0${valor.toString()}` : `${valor}`;
  }

  iniciarCronometro(): void {
    this.running = true;
    this.cronometro = 0;
    this.tiempo.duracion = '00:00:00';

    interval(1000).subscribe(() => {
      if (this.running) {
        this.cronometro++;
        this.tiempo.duracion = this.convertirDuracion(this.cronometro);
        this.cdr.detectChanges();
      }
    });
  }

  detenerCronometro(): void {
    this.running = false;
  }

  reiniciarCronometro(): void {
    this.cronometro = 0;
    this.tiempo.duracion = '00:00:00';
  }

  guardarTiempo(): void {
    console.log('Enviando tiempo:', this.tiempo);

    // Crear un nuevo objeto Tiempo con la duración formateada
    let nuevoTiempo: Tiempo = {
      id: 0, // Asignar un valor por defecto, el ID real se asignará en el servidor
      duracion: this.tiempo.duracion,
      usuario: this.tiempo.usuario
    };

    // Enviar el nuevo tiempo al servicio
    this.tiempoService.registrarTiempo(nuevoTiempo).subscribe(
      (response) => {
        console.log('Tiempo guardado correctamente. ID del tiempo:', response.idTiempo);
        this.toastr.success('Tiempo guardado correctamente', 'Éxito', {
          timeOut: 1000
        });
        window.history.back(); // Retrocede a la página anterior
      },
      (error) => {
        console.error('Error al guardar el tiempo:', error);
        this.toastr.error('Error al guardar el tiempo', 'Error', {
          timeOut: 1000
        });
      }
    );
  }
}
