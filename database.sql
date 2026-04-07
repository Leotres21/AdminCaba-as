-- =======================================================================================
-- SCRIPT DE INICIALIZACIÓN DE SUPABASE - APP CABAÑAS
-- Copia y pega el contenido de este archivo en el "SQL Editor" de tu proyecto de Supabase
-- =======================================================================================

-- 1. CONFIGURACIÓN DE ZONA HORARIA
-- Opcional: Asegurar que el sistema maneja zona horaria de Colombia
alter database postgres set timezone to 'America/Bogota';

-- 2. TABLA DE RESERVAS
CREATE TABLE public.reservas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Bogota', now()),
    nombre_cliente TEXT NOT NULL,
    telefono_cliente TEXT,
    email_cliente TEXT,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    numero_personas INTEGER DEFAULT 1,
    precio_total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    anticipo NUMERIC(12, 2) DEFAULT 0,
    -- 'confirmado', 'pendiente', 'cancelado'
    estado TEXT DEFAULT 'pendiente', 
    origen_reserva TEXT DEFAULT 'Directo', 
    observaciones TEXT
);

-- 3. TABLA DE FINANZAS (INGRESOS Y GASTOS MÚLTIPLES)
CREATE TABLE public.finanzas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Bogota', now()),
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    -- 'ingreso' o 'gasto'
    tipo TEXT NOT NULL CHECK (tipo IN ('ingreso', 'gasto')),
    concepto TEXT NOT NULL,
    categoria TEXT,
    valor NUMERIC(12, 2) NOT NULL,
    metodo_pago TEXT,
    reserva_id UUID REFERENCES public.reservas(id) ON DELETE SET NULL
);

-- 4. TABLA DE MANTENIMIENTO
CREATE TABLE public.mantenimiento (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Bogota', now()),
    fecha_reporte DATE NOT NULL DEFAULT CURRENT_DATE,
    problema TEXT NOT NULL,
    ubicacion TEXT,
    costo_estimado NUMERIC(12, 2) DEFAULT 0,
    estado TEXT DEFAULT 'urgente' -- 'urgente', 'programado', 'resuelto'
);

-- 5. TABLA DE PAGOS (EMPLEADOS)
CREATE TABLE public.pagos_personal (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Bogota', now()),
    nombre_persona TEXT NOT NULL,
    cargo TEXT,
    periodo TEXT,
    valor NUMERIC(12, 2) NOT NULL,
    estado TEXT DEFAULT 'pendiente' -- 'pagado', 'pendiente'
);

-- =======================================================================================
-- REGLAS DE SEGURIDAD (RLS)
-- Como no activaremos Autenticación por ahora, dejaremos las políticas abiertas 
-- temporalmente para que tu HTML pueda acceder usando el ANON_KEY.
-- =======================================================================================

ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finanzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mantenimiento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagos_personal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir acceso anónimo a reservas" ON public.reservas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir acceso anónimo a finanzas" ON public.finanzas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir acceso anónimo a mantenimiento" ON public.mantenimiento FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir acceso anónimo a pagos_personal" ON public.pagos_personal FOR ALL USING (true) WITH CHECK (true);
