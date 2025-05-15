import { useState, useEffect } from 'react';
import { getReservas, type Reserva } from '../Servicios/reservationService';
import { ReservationContext } from './ReservationHooks';

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshReservas = async () => {
    try {
      setLoading(true);
      const data = await getReservas();
      setReservas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar reservas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshReservas();
  }, []);

  return (
    <ReservationContext.Provider value={{ reservas, loading, error, refreshReservas }}>
      {children}
    </ReservationContext.Provider>
  );
};