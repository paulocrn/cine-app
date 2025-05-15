import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/admin/cartelera" 
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Administrar Cartelera</h2>
          <p className="text-gray-600">Gestiona las funciones y horarios</p>
        </Link>
        
        <Link 
          to="/admin/butacas" 
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Administrar Butacas</h2>
          <p className="text-gray-600">Controla el estado de los asientos</p>
        </Link>
        
        <Link 
          to="/admin/reservas" 
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Ver Reservas</h2>
          <p className="text-gray-600">Consulta todas las reservas realizadas</p>
        </Link>
      </div>
    </div>
  );
}