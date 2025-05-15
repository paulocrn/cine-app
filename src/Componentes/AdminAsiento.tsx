import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAsientos, updateAsiento } from '../Servicios/asientoService';
import LoadingSpinner from './Common/LoadingSpinner';
import ErrorMessage from './Common/ErrorMessage';

interface Asiento {
  id: number;
  fila: number;
  numero: number;
  salaId: number;
  status: boolean;
}

export default function AdminButaca() {
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<Asiento>();

  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        const data = await getAsientos();
        setAsientos(data);
      } catch (err) {
        setError('Error al cargar butacas '+err);
      } finally {
        setLoading(false);
      }
    };
    fetchAsientos();
  }, []);

  const onSubmit = async (data: Asiento) => {
    try {
      await updateAsiento(data.id, data);
      setAsientos(asientos.map(a => a.id === data.id ? data : a));
      reset();
    } catch (err) {
      setError('Error al actualizar butaca '+err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Administración de Butacas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Lista de Butacas</h2>
          <div className="bg-white shadow rounded-lg p-4">
            {asientos.map(asiento => (
              <div key={asiento.id} className="border-b py-2 flex justify-between items-center">
                <span>Fila {asiento.fila} - Número {asiento.numero} - {asiento.status ? 'Disponible' : 'Ocupado'}</span>
                <button 
                  onClick={() => reset(asiento)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Editar Butaca</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Estado</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="true">Disponible</option>
                <option value="false">Ocupado</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}