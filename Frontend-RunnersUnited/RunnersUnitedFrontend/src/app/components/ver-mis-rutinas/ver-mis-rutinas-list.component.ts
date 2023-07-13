import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Rutina } from 'src/app/models/rutina.model';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-rutinas-list',
  templateUrl: './ver-mis-rutinas-list.component.html',
  styleUrls: ['./ver-mis-rutinas-list.component.scss']
})
export class VerMisRutinasListComponent implements OnInit {
  rutinaDetails: Rutina | undefined;
  rutinas: Rutina[] = [];
  idUsuario: number | null = null;
  dataSource: MatTableDataSource<Rutina> | undefined;

  constructor(private rutinaService: RutinaService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.idUsuario = +params['id'];
      if (this.idUsuario) {
        this.obtenerRutinasPorIDUsuario(this.idUsuario);
      } else {
        this.getAllRutinas();
      }
    });
  }

  getAllRutinas() {
    this.rutinaService.getAllRutinas().subscribe((data: any) => {
      this.rutinas = data['body'];
      this.dataSource = new MatTableDataSource(this.rutinas);
    });
  }

  obtenerRutinasPorIDUsuario(idUsuario: number) {
    this.rutinaService.obtenerRutinaPorIDUsuario(idUsuario).subscribe((data: Rutina[]) => {
      this.rutinas = data;
      this.dataSource = new MatTableDataSource(this.rutinas);
    });
  }

  applyFilter(value: string) {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }

  modificarProgreso(id: number) {
    if (id !== undefined) {
      this.router.navigate(['detail/modificar-progreso', id]);
    }
  }

  eliminarRutina(id: number) {
    console.log(id);
    const ok = confirm('¿Estás seguro de eliminar el producto?');
    if (ok) {
      this.rutinaService.delete(id).subscribe(() => {
        if (this.idUsuario) {
          this.obtenerRutinasPorIDUsuario(this.idUsuario);
        } else {
          this.getAllRutinas();
        }
      });
    }
  }
}
