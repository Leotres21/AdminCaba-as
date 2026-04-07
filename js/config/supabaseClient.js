// --- ATENCIÓN: PEGA TUS CREDENCIALES AQUÍ ---
// Estas credenciales las encuentras en el panel de Supabase:
// Settings -> API -> Project URL & Project API Keys (anon, public)

const SUPABASE_URL = 'https://wlhkksvxbkolquhrdqlk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsaGtrc3Z4YmtvbHF1aHJkcWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzY2NjUsImV4cCI6MjA5MTExMjY2NX0.eQAom69NifoFNaaXpFT1fvNqCDq24xTdulukhA9umMs';

// Exportamos la instancia única de acceso a la DB
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
