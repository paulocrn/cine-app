export interface Pelicula {
  id: number;
  nombre: string;
  genero: string;
  duracionMinutos: number;
  edadMinimaPermitida: number;
}

export interface Sala {
  id: number;
  nombre: string;
  numero: number;
}

export interface Asiento {
  id: number;
  fila: number;
  numero: number;
  salaId: number;
  status: boolean;
}

export interface Cartelera {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  peliculaId: number;
  salaId: number;
  pelicula?: Pelicula;
  nombrePelicula?: string;
  generoPelicula?: string;
  nombreSala?: string;
  sala?: Sala;
}

export interface Reserva {
  id: number;
  fechaReserva: string;
  clienteId: number;
  asientoId: number;
  carteleraId: number;
  asiento?: Asiento;
  cartelera?: Cartelera;
}

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

// Tipos para estadísticas
export interface AsientosPorSalaDto {
  salaId: number;
  disponibles: number;
  ocupados: number;
}

export interface ReservasPorGeneroDto {
  genero: string;
  cantidad: number;
  totalRecaudado: number;
}