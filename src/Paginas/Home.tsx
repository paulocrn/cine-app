import { useEffect, useState } from 'react';
import { getCarteleras } from '../Servicios/carteleraService';
import LoadingSpinner from '../Componentes/Common/LoadingSpinner';
import ErrorMessage from '../Componentes/Common/ErrorMessage';
import MovieCard from '../Componentes/Common/MovieCard';
import type { Cartelera } from '../Types/types';

export default function Home() {
  const [carteleras, setCarteleras] = useState<Cartelera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarteleras = async () => {
      try {
        const data = await getCarteleras();

        setCarteleras(data);
      } catch (err) {
        setError('Error al cargar la cartelera '+err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarteleras();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Próximos Estrenos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carteleras.slice(0, 3).map(cartelera => (
          <MovieCard key={cartelera.id} cartelera={cartelera} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Todas las Funciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carteleras.map(cartelera => (
          <MovieCard key={cartelera.id} cartelera={cartelera} />
        ))}
      </div>
    </div>
  );
}