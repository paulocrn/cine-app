import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCarteleraById } from '../Servicios/carteleraService';
import { createReserva, getReservasPorCartelera } from '../Servicios/reservationService';
import SeatSelector from '../Componentes/SeatSelector';
import LoadingSpinner from '../Componentes/Common/LoadingSpinner';
import ErrorMessage from '../Componentes/Common/ErrorMessage';
import type { Cartelera, Reserva} from '../Types/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  asientoId: number;
}

interface ReservationData {
  fechaReserva: string;
  clienteId?: number;
  asientoId: number;
  carteleraId: number;
  nombreCliente: string;
  apellidoCliente: string;
  emailCliente: string;
}

export default function ReservationForm() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [cartelera, setCartelera] = useState<Cartelera | null>(null);
  const [asientosOcupados, setAsientosOcupados] = useState<number[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [loading, setLoading] = useState({
    cartelera: true,
    asientos: true,
    submitting: false
  });
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm<FormData>();

  // Obtener edad del formulario para validación
  const edad = watch('edad');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar datos de la cartelera
        const carteleraData = await getCarteleraById(Number(id));
        setCartelera(carteleraData);

        // Cargar asientos ocupados para esta cartelera
        const reservas = await getReservasPorCartelera(Number(id));
        const asientosOcupadosIds = reservas.map(r => r.asientoId);
        setAsientosOcupados(asientosOcupadosIds);

        setLoading(prev => ({ ...prev, cartelera: false, asientos: false }));
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(`Error al cargar los datos de la función: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(prev => ({ ...prev, cartelera: false, asientos: false }));
      }
    };

    fetchData();
  }, [id]);

  const handleSeatSelection = (asientoId: number) => {
    // Verificar si el asiento está ocupado
    if (asientosOcupados.includes(asientoId)) {
      toast.warning('Este asiento ya está reservado');
      return;
    }
    setSelectedSeat(asientoId);
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedSeat) {
      toast.error('Debes seleccionar un asiento');
      return;
    }

    // Validar edad mínima
    if (cartelera?.pelicula?.edadMinimaPermitida && edad < cartelera.pelicula.edadMinimaPermitida) {
      toast.error(`Esta película es para mayores de ${cartelera.pelicula.edadMinimaPermitida} años`);
      return;
    }

    try {
      setLoading(prev => ({ ...prev, submitting: true }));

      const reservationData: ReservationData = {
        fechaReserva: new Date().toISOString(),
        asientoId: selectedSeat,
        carteleraId: Number(id),
        nombreCliente: data.nombre,
        apellidoCliente: data.apellido,
        emailCliente: data.email
      };

      await createReserva(reservationData as Omit<Reserva, 'id'>);
      
      toast.success('Reserva creada exitosamente!');
      navigate('/reservas', { state: { reservationSuccess: true } });
    } catch (err) {
      console.error('Error al crear reserva:', err);
      toast.error(`Error al crear la reserva: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  if (loading.cartelera) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!cartelera) return <ErrorMessage message="Función no encontrada" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reservar Entrada</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{cartelera.pelicula?.nombre}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">
                  <strong>Fecha:</strong> {new Date(cartelera.fecha).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Horario:</strong> {cartelera.horaInicio} - {cartelera.horaFin}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Sala:</strong> {cartelera.sala?.nombre || `Sala ${cartelera.salaId}`}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  <strong>Duración:</strong> {cartelera.pelicula?.duracionMinutos} minutos
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Género:</strong> {cartelera.pelicula?.genero}
                </p>
                <p className="text-gray-600">
                  <strong>Clasificación:</strong> +{cartelera.pelicula?.edadMinimaPermitida || 'TP'}
                </p>
              </div>
            </div>
          </div>

          {cartelera.salaId && (
            <SeatSelector 
              salaId={cartelera.salaId} 
              onSeatSelected={handleSeatSelection}
              selectedSeatId={selectedSeat || undefined}
              asientosOcupados={asientosOcupados}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Datos del Cliente</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nombre *</label>
              <input
                type="text"
                {...register('nombre', { 
                  required: 'Nombre es requerido',
                  minLength: {
                    value: 2,
                    message: 'El nombre debe tener al menos 2 caracteres'
                  }
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su nombre"
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Apellido *</label>
              <input
                type="text"
                {...register('apellido', { 
                  required: 'Apellido es requerido',
                  minLength: {
                    value: 2,
                    message: 'El apellido debe tener al menos 2 caracteres'
                  }
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su apellido"
              />
              {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Edad *</label>
              <input
                type="number"
                {...register('edad', { 
                  required: 'Edad es requerida',
                  min: {
                    value: 1,
                    message: 'Edad mínima es 1 año'
                  },
                  max: {
                    value: 120,
                    message: 'Edad máxima es 120 años'
                  },
                  valueAsNumber: true
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su edad"
              />
              {errors.edad && <p className="text-red-500 text-sm mt-1">{errors.edad.message}</p>}
              {cartelera.pelicula?.edadMinimaPermitida && edad && edad < cartelera.pelicula.edadMinimaPermitida && (
                <p className="text-yellow-600 text-sm mt-1">
                  Advertencia: Esta película es para mayores de {cartelera.pelicula.edadMinimaPermitida} años
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Asiento seleccionado</label>
              <div className={`px-3 py-2 border rounded ${selectedSeat ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                {selectedSeat ? (
                  <div className="flex justify-between items-center">
                    <span>Asiento #{selectedSeat}</span>
                    <button 
                      type="button" 
                      onClick={() => setSelectedSeat(null)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Cambiar
                    </button>
                  </div>
                ) : (
                  'Ningún asiento seleccionado'
                )}
              </div>
              {!selectedSeat && (
                <p className="text-red-500 text-sm mt-1">Debes seleccionar un asiento</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedSeat || loading.submitting}
              className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors
                ${!selectedSeat || loading.submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {loading.submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                'Confirmar Reserva'
              )}
            </button>

            <p className="text-gray-500 text-xs mt-4">
              * Campos obligatorios. Al realizar la reserva aceptas nuestros términos y condiciones.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}