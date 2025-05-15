import { useState, useEffect } from 'react';

interface Pelicula {
  id: number;
  nombre: string;
  genero: string;
  duracionMinutos: number;
}

interface CarteleraCompleta {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  pelicula: Pelicula;
  salaId: number;
}

export default function Cartelera() {
  const [cartelera, setCartelera] = useState<CarteleraCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartelera = async () => {
      try {
        const data = await getCarteleras();
        setCartelera(data);
      } catch (err) {
        setError('Error al cargar la cartelera '+err);
      } finally {
        setLoading(false);
      }
    };
    fetchCartelera();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cartelera</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartelera.map(item => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{item.pelicula.nombre}</h2>
              <p className="text-gray-600 mb-1">{item.pelicula.genero}</p>
              <p className="text-gray-600 mb-1">Duración: {item.pelicula.duracionMinutos} min</p>
              <p className="text-gray-600 mb-1">Sala: {item.salaId}</p>
              <p className="text-gray-600 mb-1">
                {new Date(item.fecha).toLocaleDateString()} - {item.horaInicio} a {item.horaFin}
              </p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Reservar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}