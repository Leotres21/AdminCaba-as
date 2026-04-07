export const formatCOP = (value) => {
    // Convierte el valor a número en caso de que sea string
    const numberValue = Number(value);
    
    // Si no es un número válido, retornamos $0
    if (isNaN(numberValue)) return '$0';
    
    // Usa Intl.NumberFormat para formatear nativamente como Moneda COP sin decimales molestos
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numberValue);
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    // Crea un string de fecha (ej. 15 Oct 2023)
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    // Para evitar offset de zona horaria molesto, a veces es mejor reemplazar '-' por '/' si viene como YYYY-MM-DD
    const cleanDate = new Date(dateString.replace(/-/g, '\/'));
    return cleanDate.toLocaleDateString('es-CO', options);
};

export const calcSaldo = (total, anticipo) => {
    const t = Number(total) || 0;
    const a = Number(anticipo) || 0;
    return t - a;
};
