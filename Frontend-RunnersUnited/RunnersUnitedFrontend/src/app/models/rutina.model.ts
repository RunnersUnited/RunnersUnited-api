export interface Rutina {
  id: number;
  nombre: string;
  descripcion: string;
  nivel: string;
  fechaInicio: string;
  cantidadDias: number;
  fechaFin: string;
  progreso: number;
  usuario: Object;
}
