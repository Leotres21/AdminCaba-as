import { supabase } from '../config/supabaseClient.js';

export const getReservas = async () => {
    try {
        const { data, error } = await supabase
            .from('reservas')
            .select('*')
            .order('fecha_entrada', { ascending: true });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching reservas:', error);
        return [];
    }
};

export const createReserva = async (reservaData) => {
    try {
        const { data, error } = await supabase
            .from('reservas')
            .insert([reservaData])
            .select();
            
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error creating reserva:', error);
        throw error;
    }
};

export const updateReservaEstado = async (id, nuevoEstado) => {
    try {
        const { data, error } = await supabase
            .from('reservas')
            .update({ estado: nuevoEstado })
            .eq('id', id)
            .select();
            
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error updating reserva:', error);
        throw error;
    }
};

export const deleteReserva = async (id) => {
    try {
        const { error } = await supabase
            .from('reservas')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting reserva:', error);
        throw error;
    }
};
