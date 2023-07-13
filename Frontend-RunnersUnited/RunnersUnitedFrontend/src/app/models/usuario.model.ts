export interface Usuario {
  usuario: Object;
  idUsuario: number;
  id: number;
  nombre: string;
  correoUsuario: string;
  contrasenaUsuario: string;
  edad: number;
  tipo: string;
  estado: string;
  genero: string;
  imc: number;
  altura: number;
  peso: number;
  rol: Object;

  // Añade esta propiedad
  body: {
    id: number;
    nombre: string;
    tipo: string;
  };
}
