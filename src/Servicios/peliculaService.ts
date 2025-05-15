import axios from 'axios';
import type { Pelicula } from '../Types/types';

const API_URL = import.meta.env.REACT_APP_API_URL + '/pelicula';

export const getPeliculas = async (): Promise<Pelicula[]> => {
  try {
    const response = await axios.get(`${API_URL}/peliculas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching películas:', error);
    throw error;
  }
};

export const getPeliculaById = async (id: number): Promise<Pelicula> => {
  try {
    const response = await axios.get(`${API_URL}/peliculas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching película:', error);
    throw error;
  }
};