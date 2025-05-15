import LoadingSpinner from '../Componentes/Common/LoadingSpinner';
import ErrorMessage from '../Componentes/Common/ErrorMessage';
import { useReservations } from '../Context/ReservationHooks';

export default function Reservas() {
  const { reservas, loading, error } = useReservations();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>
      
      {reservas.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">No tienes reservas aún</p>
          <a 
            href="/cartelera" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver Cartelera
          </a>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Película</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asiento</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservas.map(reserva => (
                <tr key={reserva.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reserva.cartelera?.pelicula?.nombre || 'Película'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(reserva.cartelera?.fecha || '').toLocaleDateString()} - {reserva.cartelera?.horaInicio}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {reserva.cartelera?.sala?.nombre || `Sala ${reserva.cartelera?.salaId}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      Fila {reserva.asiento?.fila} - Asiento {reserva.asiento?.numero}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}