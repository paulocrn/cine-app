import { useEffect, useState } from 'react';
import { getAsientos } from '../Servicios/asientoService';
import LoadingSpinner from './Common/LoadingSpinner';
import ErrorMessage from './Common/ErrorMessage';

interface SeatSelectorProps {
  salaId: number;
  onSeatSelected: (asientoId: number) => void;
  selectedSeatId?: number;
  asientosOcupados? : number[];
  loading?: boolean;
}

export default function SeatSelector({ salaId, onSeatSelected, selectedSeatId, asientosOcupados }: SeatSelectorProps) {
  const [asientos, setAsientos] = useState<{fila: number, asientos: {id: number, numero: number, estado: boolean}[]}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        const data = await getAsientos(salaId);
        
        // Organizar asientos por fila
        const asientosPorFila: Record<number, {id: number, numero: number, estado: boolean}[]> = {};
        
        data.forEach(asiento => {
          if (!asientosPorFila[asiento.fila]) {
            asientosPorFila[asiento.fila] = [];
          }
          asientosPorFila[asiento.fila].push({
            id: asiento.id,
            numero: asiento.numero,
            estado: asiento.status
          });
        });

        // Convertir a array ordenado
        const result = Object.keys(asientosPorFila)
          .sort()
          .map(fila => ({
            fila: parseInt(fila),
            asientos: asientosPorFila[parseInt(fila)].sort((a, b) => a.numero - b.numero)
          }));

        setAsientos(result);
      } catch (err) {
        setError('Error al cargar los asientos '+err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsientos();
  }, [salaId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Selecciona tu asiento</h3>
      <div className="flex flex-col items-center">
        {/* Pantalla */}
        <div className="w-full bg-gray-300 text-center py-2 mb-6 rounded">
          Pantalla
        </div>
        
        {/* Asientos */}
        {asientos.map(({fila, asientos}) => (
          <div key={fila} className="flex mb-2">
            <span className="w-8 text-sm text-gray-600 self-center">Fila {fila}</span>
            <div className="flex space-x-2">
              {asientos.map(asiento => (
                <button
                  key={asiento.id}
                  onClick={() => onSeatSelected(asiento.id)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs
                    ${asiento.id === selectedSeatId ? 'bg-blue-600 text-white' : 
                      !asiento.estado ? 'bg-green-100 hover:bg-green-200' : 'bg-indigo-600 cursor-not-allowed'}
                  `}
                  disabled={asiento.estado}
                  title={!asiento.estado ? `Fila ${fila} - Asiento ${asiento.numero}` : 'Ocupado'}
                >
                  {asiento.numero}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}