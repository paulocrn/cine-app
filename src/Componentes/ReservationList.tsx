import { useReservations } from "../Context/ReservationHooks";

export default function ReservationList() {
  const { reservas, loading, error, refreshReservas } = useReservations();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Reservas</h1>
        <button
          onClick={refreshReservas}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asiento ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cartelera ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map(reserva => (
              <tr key={reserva.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(reserva.fechaReserva).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.clienteId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.asientoId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.carteleraId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}