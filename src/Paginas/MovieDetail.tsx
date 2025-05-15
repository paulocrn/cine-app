import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeliculaById } from '../Servicios/peliculaService';
import { getCarteleras } from '../Servicios/carteleraService';
import LoadingSpinner from '../Componentes/Common/LoadingSpinner';
import ErrorMessage from '../Componentes/Common/ErrorMessage';
import MovieCard from '../Componentes/Common/MovieCard';
import type { Cartelera, Pelicula } from '../Types/types';

export default function MovieDetail() {
  const { id } = useParams<{id: string}>();
  const [pelicula, setPelicula] = useState<Pelicula>();
  const [carteleras, setCarteleras] = useState<Cartelera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peliculaData, cartelerasData] = await Promise.all([
          getPeliculaById(Number(id)),
          getCarteleras()
        ]);
        
        setPelicula(peliculaData);
        setCarteleras(cartelerasData.filter((c: Cartelera) => c.peliculaId === Number(id)));
      } catch (err) {
        setError('Error al cargar los datos de la película '+err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!pelicula) return <ErrorMessage message="Película no encontrada" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="bg-gray-200 w-full h-64 md:h-96 rounded-lg"></div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{pelicula.nombre}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {pelicula.genero}
            </span>
            <span>{pelicula.duracionMinutos} min</span>
            <span>Edad mínima: {pelicula.edadMinimaPermitida}+</span>
          </div>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
            rhoncus ut eleifend nibh porttitor.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Funciones Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carteleras.map(cartelera => (
          <MovieCard key={cartelera.id} cartelera={cartelera} />
        ))}
      </div>
    </div>
  );
}