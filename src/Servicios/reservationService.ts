import axios from 'axios';
import type { Reserva } from '../Types/types';

const API_URL = import.meta.env.VITE_API_URL + '/reserva';

export const getReservas = async (): Promise<Reserva[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservas:', error);
    throw error;
  }
};

export const getReservaById = async (id: number): Promise<Reserva> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reserva:', error);
    throw error;
  }
};

export const createReserva = async (reserva: Omit<Reserva, 'id'>): Promise<Reserva> => {
  try {
    const response = await axios.post(API_URL, reserva);
    return response.data;
  } catch (error) {
    console.error('Error creating reserva:', error);
    throw error;
  }
};

export const updateReserva = async (id: number, reserva: Reserva): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, reserva);
  } catch (error) {
    console.error('Error updating reserva:', error);
    throw error;
  }
};

export const deleteReserva = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting reserva:', error);
    throw error;
  }
};

export const getReservasPorCliente = async (clienteId: number): Promise<Reserva[]> => {
  try {
    const response = await axios.get(`${API_URL}/por-cliente/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservas por cliente:', error);
    throw error;
  }
};

export const getReservasPorCartelera = async (carteleraId: number): Promise<Reserva[]> => {
  try {
    const response = await axios.get(`${API_URL}/por-cartelera/${carteleraId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservas por cartelera:', error);
    throw error;
  }
};

export const getReservasDeTerrorPorRangoFechas = async (desde: string, hasta: string): Promise<Reserva[]> => {
  try {
    const response = await axios.get(`${API_URL}/terror`, {
      params: { desde, hasta }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservas de terror:', error);
    throw error;
  }
};