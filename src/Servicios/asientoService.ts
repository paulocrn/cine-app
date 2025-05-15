import axios from 'axios';
import type { Asiento } from '../Types/types';

//const API_URL = 'http://localhost:5000/api/asientos';
const API_URL = import.meta.env.VITE_API_URL + '/asientos';

export const getAsientos = async (salaId?: number): Promise<Asiento[]> => {
  try {
    const url = salaId ? `${API_URL}/por-sala/${salaId}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching asientos:', error);
    throw error;
  }
};

export const getAsientoById = async (id: number): Promise<Asiento> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asiento:', error);
    throw error;
  }
};

export const createAsiento = async (asiento: Omit<Asiento, 'id'>): Promise<Asiento> => {
  try {
    const response = await axios.post(API_URL, asiento);
    return response.data;
  } catch (error) {
    console.error('Error creating asiento:', error);
    throw error;
  }
};

export const updateAsiento = async (id: number, asiento: Asiento): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, asiento);
  } catch (error) {
    console.error('Error updating asiento:', error);
    throw error;
  }
};

export const deleteAsiento = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting asiento:', error);
    throw error;
  }
};

export const getAsientosPorSalaDelDia = async (): Promise<{salaId: number, disponibles: number, ocupados: number}[]> => {
  try {
    const response = await axios.get(`${API_URL}/por-dia`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asientos por dia:', error);
    throw error;
  }
};

export const inhabilitarAsientoYCancelarReserva = async (asientoId: number, reservaId: number): Promise<void> => {
  try {
    await axios.post(`${API_URL}/inhabilitar-y-cancelar`, null, {
      params: { asientoId, reservaId }
    });
  } catch (error) {
    console.error('Error inhabilitando asiento:', error);
    throw error;
  }
};