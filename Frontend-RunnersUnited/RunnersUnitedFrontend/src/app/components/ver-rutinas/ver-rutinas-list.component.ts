import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Rutina } from 'src/app/models/rutina.model';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-rutinas-list',
  templateUrl: './ver-rutinas-list.component.html',
  styleUrls: ['./ver-rutinas-list.component.scss']
})
export class VerRutinasListComponent implements OnInit {
  rutinaDetails: Rutina | undefined;
  rutinas: Rutina[] = [];
  idRuta: number | null = null;
  dataSource: MatTableDataSource<Rutina> | undefined;

  constructor(private rutinaService: RutinaService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.idRuta = +params['id'];
      if (this.idRuta) {
        this.obtenerRutinasPorID(this.idRuta);
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

  obtenerRutinasPorID(id: number) {
    this.rutinaService.obtenerRutinaPorIDUsuario(id).subscribe((data: Rutina[]) => {
      this.rutinas = data;
      this.dataSource = new MatTableDataSource(this.rutinas);
    });
  }


  applyFilter(value: string) {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }

  eliminarRutina(id: number) {
    console.log(id);
    const ok = confirm('¿Estás seguro de eliminar el producto?');
    if (ok) {
      this.rutinaService.delete(id).subscribe(() => {
        if (this.idRuta) {
          this.obtenerRutinasPorID(this.idRuta);
        } else {
          this.getAllRutinas();
        }
      });
    }
  }
}
