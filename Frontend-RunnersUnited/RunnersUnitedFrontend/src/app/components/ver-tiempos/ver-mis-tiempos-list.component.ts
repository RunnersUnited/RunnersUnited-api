import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Tiempo } from 'src/app/models/tiempo.model';
import { TiempoService } from 'src/app/services/tiempo.service';

@Component({
  selector: 'app-tiempos-list',
  templateUrl: './ver-mis-tiempos-list.component.html',
  styleUrls: ['./ver-mis-tiempos-list.component.scss']
})
export class VerTiemposListComponent implements OnInit {
  tiempoDetails: Tiempo | undefined;
  tiempos: Tiempo[] = [];
  idUsuario: number | null = null;
  dataSource: MatTableDataSource<Tiempo> | undefined;

  constructor(private tiempoService: TiempoService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.idUsuario = +params['id'];
      if (this.idUsuario) {
        this.obtenerTiempoPorIDUsuario(this.idUsuario);
      } else {
        this.getAllTiempos();
      }
    });
  }

  getAllTiempos() {
    this.tiempoService.getAllTiempos().subscribe((data: any) => {
      this.tiempos = data['body'];
      this.dataSource = new MatTableDataSource(this.tiempos);
    });
  }

  obtenerTiempoPorIDUsuario(idUsuario: number) {
    this.tiempoService.obtenerTiempoPorIDUsuario(idUsuario).subscribe((data: Tiempo[]) => {
      this.tiempos = data;
      this.dataSource = new MatTableDataSource(this.tiempos);
    });
  }

  applyFilter(value: string) {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLowerCase();
    }
  }

  eliminarTiempo(id: number) {
    console.log(id);
    const ok = confirm('¿Estás seguro de eliminar el producto?');
    if (ok) {
      this.tiempoService.delete(id).subscribe(() => {
        if (this.idUsuario) {
          this.obtenerTiempoPorIDUsuario(this.idUsuario);
        } else {
          this.getAllTiempos();
        }
      });
    }
  }
}
