import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReservationProvider } from './Context/ReservationContext';
//import Header from './Componentes/Common/Header';
import Home from './Paginas/Home';
import Cartelera from './Paginas/Cartelera';
import Reservas from './Paginas/Reservas';
import Admin from './Paginas/Admin';
import AdminButaca from './Componentes/AdminAsiento';
import AdminCartelera from './Componentes/AdminCartelera';
import ReservationList from './Componentes/ReservationList';
import MovieDetail from './Paginas/MovieDetail';
import ReservationForm from './Paginas/ReservationForm';

function App() {
  return (
    <Router>
      <ReservationProvider>
        <div className="min-h-screen bg-gray-100">
          {/* <Header /> */}
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cartelera" element={<Cartelera />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/pelicula/:id" element={<MovieDetail />} />
              <Route path="/reservar/:id" element={<ReservationForm />} />
              
              {/* Rutas de administración */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/butacas" element={<AdminButaca />} />
              <Route path="/admin/cartelera" element={<AdminCartelera />} />
              <Route path="/admin/reservas" element={<ReservationList />} />
            </Routes>
          </main>
        </div>
      </ReservationProvider>
    </Router>
  );
}

export default App;