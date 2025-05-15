import { Link } from 'react-router-dom';
import type { Cartelera } from '../../Types/types';

interface MovieCardProps {
  cartelera: Cartelera;
}

export default function MovieCard({ cartelera }: MovieCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{cartelera.nombrePelicula || 'Película'}</h2>
        <p className="text-gray-600 mb-1">{cartelera.generoPelicula || 'Género'}</p>
        <p className="text-gray-600 mb-1">Duración: {cartelera.pelicula?.duracionMinutos || '--'} min</p>
        <p className="text-gray-600 mb-1">Sala: {cartelera.nombreSala || cartelera.salaId}</p>
        <p className="text-gray-600 mb-1">
          {new Date(cartelera.fecha).toLocaleDateString()} - {cartelera.horaInicio} a {cartelera.horaFin}
        </p>
        <div className="mt-4 flex space-x-2">
          <Link 
            to={`/pelicula/${cartelera.peliculaId}`}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Detalles
          </Link>
          <Link 
            to={`/reservar/${cartelera.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}