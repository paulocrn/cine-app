import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">CineApp</Link>
        
        <nav className="flex space-x-4">
          <Link to="/cartelera" className="hover:bg-blue-700 px-3 py-2 rounded">Cartelera</Link>
          <Link to="/reservas" className="hover:bg-blue-700 px-3 py-2 rounded">Reservas</Link>
          <Link to="/admin" className="hover:bg-blue-700 px-3 py-2 rounded">Admin</Link>
        </nav>
      </div>
    </header>
  );
}