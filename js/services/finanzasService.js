import { supabase } from '../config/supabaseClient.js';

export const getFinanzasTotales = async () => {
    try {
        const { data, error } = await supabase
            .from('finanzas')
            .select('*');
            
        if (error) throw error;
        
        let ingresos = 0;
        let gastos = 0;
        
        data.forEach(item => {
            if(item.tipo === 'ingreso') ingresos += Number(item.valor);
            if(item.tipo === 'gasto') gastos += Number(item.valor);
        });
        
        return {
            ingresos,
            gastos,
            utilidad: ingresos - gastos,
            raw: data
        };
    } catch (error) {
        console.error('Error fetching finanzas totales:', error);
        return { ingresos: 0, gastos: 0, utilidad: 0, raw: [] };
    }
};

export const getIngresos = async () => {
    try {
        const { data, error } = await supabase
            .from('finanzas')
            .select(`*, reservas(nombre_cliente)`)
            .eq('tipo', 'ingreso')
            .order('fecha', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching ingresos:', error);
        return [];
    }
};

export const getGastos = async () => {
    try {
        const { data, error } = await supabase
            .from('finanzas')
            .select('*')
            .eq('tipo', 'gasto')
            .order('fecha', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching gastos:', error);
        return [];
    }
};

export const createTransaccion = async (transaccionData) => {
    try {
        const { data, error } = await supabase
            .from('finanzas')
            .insert([transaccionData])
            .select();
            
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error creating transaccion:', error);
        throw error;
    }
};
