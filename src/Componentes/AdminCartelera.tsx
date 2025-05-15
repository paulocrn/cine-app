import { useEffect, useState } from 'react';
import { getCarteleras, deleteCartelera, cancelarCarteleraYReservas } from '../Servicios/carteleraService';
import LoadingSpinner from './Common/LoadingSpinner';
import ErrorMessage from './Common/ErrorMessage';
import type { Cartelera } from '../Types/types';

export default function AdminCartelera() {
  const [carteleras, setCarteleras] = useState<Cartelera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCarteleras();
  }, []);

  const fetchCarteleras = async () => {
    try {
      const data = await getCarteleras();
      setCarteleras(data);
    } catch (err) {
      setError('Error al cargar la cartelera');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCartelera(id);
      fetchCarteleras();
    } catch (err) {
      setError('Error al eliminar la cartelera');
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await cancelarCarteleraYReservas(id);
      fetchCarteleras();
    } catch (err) {
      setError('Error al cancelar la cartelera');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Administrar Cartelera</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Película</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carteleras.map(cartelera => (
              <tr key={cartelera.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {cartelera.pelicula?.nombre || 'Película'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(cartelera.fecha).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {cartelera.sala?.nombre || `Sala ${cartelera.salaId}`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {cartelera.horaInicio} - {cartelera.horaFin}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleCancel(cartelera.id)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDelete(cartelera.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}