import { createContext, useContext } from 'react';
import type { Reserva } from '../Servicios/reservationService';

interface ReservationContextType {
  reservas: Reserva[];
  loading: boolean;
  error: string | null;
  refreshReservas: () => Promise<void>;
}

export const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservations debe usarse dentro de ReservationProvider');
  }
  return context;
};
