import axios from 'axios';
import type { AsientosPorSalaDto, Cartelera, Reserva } from '../Types/types';

const API_URL = import.meta.env.VITE_API_URL + '/cartelera';

export const getCarteleras = async (): Promise<Cartelera[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching carteleras:', error);
    throw error;
  }
};

export const createCartelera = async (cartelera: Omit<Cartelera, 'id'>): Promise<Cartelera> => {
  try {
    const response = await axios.post(API_URL, cartelera);
    return response.data;
  } catch (error) {
    console.error('Error creating cartelera:', error);
    throw error;
  }
};

export const getCarteleraById = async (id: number): Promise<Cartelera> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cartelera:', error);
    throw error;
  }
};

export const updateCartelera = async (id: number, cartelera: Cartelera): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, cartelera);
  } catch (error) {
    console.error('Error updating cartelera:', error);
    throw error;
  }
};

export const deleteCartelera = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting cartelera:', error);
    throw error;
  }
};

export const cancelarCarteleraYReservas = async (carteleraId: number): Promise<void> => {
  try {
    await axios.post(`${API_URL}/cancelar/${carteleraId}`);
  } catch (error) {
    console.error('Error canceling cartelera:', error);
    throw error;
  }
};

export const getReservasPorGeneroYRangoFechas = async (genero: string, desde: string, hasta: string): Promise<Reserva[]> => {
  try {
    const response = await axios.get(`${API_URL}/reservas-genero`, {
      params: { genero, desde, hasta }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservas por genero:', error);
    throw error;
  }
};

export const getEstadisticasAsientosPorSala = async (fecha: string): Promise<AsientosPorSalaDto[]> => {
  try {
    const response = await axios.get(`${API_URL}/estadisticas-asientos`, {
      params: { fecha }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching estadísticas asientos:', error);
    throw error;
  }
};