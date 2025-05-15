import axios from 'axios';
import type { Sala } from '../Types/types';

const API_URL = import.meta.env.VITE_API_URL + '/sala';

export const getSalas = async (): Promise<Sala[]> => {
  try {
    const response = await axios.get(`${API_URL}/salas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching salas:', error);
    throw error;
  }
};

export const getSalaById = async (id: number): Promise<Sala> => {
  try {
    const response = await axios.get(`${API_URL}/salas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sala:', error);
    throw error;
  }
};