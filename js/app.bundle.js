// ==========================================
// 1. UTILIDADES
// ==========================================
const formatCOP = (value) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return '$0';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(numberValue);
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
};

const calcSaldo = (total, anticipo) => {
    return (Number(total) || 0) - (Number(anticipo) || 0);
};

// ==========================================
// 2. CLIENTE SUPABASE
// ==========================================
const SUPABASE_URL = 'https://wlhkksvxbkolquhrdqlk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsaGtrc3Z4YmtvbHF1aHJkcWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzY2NjUsImV4cCI6MjA5MTExMjY2NX0.eQAom69NifoFNaaXpFT1fvNqCDq24xTdulukhA9umMs';

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
if (!supabase) alert("Supabase JS no cargó correctamente desde internet.");

// ==========================================
// 3. SERVICIOS (Llamadas a Base de Datos)
// ==========================================
const getReservas = async () => {
    try {
        const { data, error } = await supabase.from('reservas').select('*').order('fecha_entrada', { ascending: true });
        if (error) throw error;
        return data;
    } catch (error) { console.error(error); return []; }
};

const createReserva = async (reservaData) => {
    try {
        const { data, error } = await supabase.from('reservas').insert([reservaData]).select();
        if (error) throw error;
        return data[0];
    } catch (error) { console.error(error); throw error; }
};

// ==========================================
// 4. VISTAS (Views)
// ==========================================
function DashboardView() {
    return "<div class='dashboard-container' style='display:flex; flex-direction:column; gap:24px;'>" +
           "  <div class='grid-cols-4'>" +
           "    <div class='card'><div style='color: var(--text-secondary); font-size: 0.875rem;'>Reservas de Hoy</div><div style='font-size: 1.75rem; font-weight: 700; margin-top: 8px;'>3</div></div>" +
           "    <div class='card'><div style='color: var(--text-secondary); font-size: 0.875rem;'>Ingresos del Mes</div><div style='font-size: 1.75rem; font-weight: 700; margin-top: 8px; color: var(--primary)'>$4.250</div></div>" +
           "    <div class='card'><div style='color: var(--text-secondary); font-size: 0.875rem;'>Gastos del Mes</div><div style='font-size: 1.75rem; font-weight: 700; margin-top: 8px; color: var(--danger)'>$1.150</div></div>" +
           "    <div class='card'><div style='color: var(--text-secondary); font-size: 0.875rem;'>Ocupación</div><div style='font-size: 1.75rem; font-weight: 700; margin-top: 8px; color: var(--warning)'>85%</div></div>" +
           "  </div>" +
           "</div>";
}

function ReservasView() {
    setTimeout(function() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const target = tab.getAttribute('data-target');
                tabs.forEach(function(t) { t.classList.remove('active'); });
                contents.forEach(function(c) { c.classList.remove('active-content'); });
                tab.classList.add('active');
                document.getElementById(target).classList.add('active-content');
            });
        });

        async function loadReservas() {
            const tableBody = document.getElementById('reservas-tbody');
            if(!tableBody) return;
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center">Cargando reservas...</td></tr>';
            try {
                const reservas = await getReservas();
                if(reservas.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center">No hay reservas registradas.</td></tr>';
                    return;
                }
                
                let htmlStr = '';
                reservas.forEach(function(res) {
                    const saldo = calcSaldo(res.precio_total, res.anticipo);
                    const bc = res.estado === 'confirmado' ? 'success' : res.estado === 'pendiente' ? 'warning' : 'danger';
                    const telHtml = res.telefono_cliente ? "<div style='font-size:0.8rem; color:var(--text-secondary)'>" + res.telefono_cliente + "</div>" : "";
                    const saldoColor = saldo > 0 ? "color:var(--danger); font-weight:600" : "color:var(--text-secondary)";
                    
                    htmlStr += "<tr>" +
                        "<td><div style='font-weight:600'>" + res.nombre_cliente + "</div>" + telHtml + "</td>" +
                        "<td><div>In: " + formatDate(res.fecha_entrada) + "</div><div style='font-size:0.8rem; color:var(--text-secondary)'>Out: " + formatDate(res.fecha_salida) + "</div></td>" +
                        "<td>" + res.numero_personas + "</td><td><span class='badge " + bc + "'>" + res.estado + "</span></td>" +
                        "<td>" + formatCOP(res.precio_total) + "</td><td><span style='" + saldoColor + "'>" + formatCOP(saldo) + "</span></td>" +
                        "<td><button class='icon-btn'><i class='ph ph-eye'></i></button></td>" +
                    "</tr>";
                });
                tableBody.innerHTML = htmlStr;
            } catch (error) { 
                tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:red">Error al cargar listado: ' + error.message + '</td></tr>'; 
            }
        }
        loadReservas();

        const formNueva = document.getElementById('form-nueva-reserva');
        if(formNueva) {
            formNueva.addEventListener('submit', async function(e) {
                e.preventDefault();
                const formData = new FormData(formNueva);
                const data = {
                    nombre_cliente: formData.get('nombre'), telefono_cliente: formData.get('telefono'),
                    fecha_entrada: formData.get('fecha_in'), fecha_salida: formData.get('fecha_out'),
                    numero_personas: parseInt(formData.get('personas')), origen_reserva: formData.get('origen'),
                    precio_total: parseFloat(formData.get('precio')), anticipo: parseFloat(formData.get('anticipo')),
                    observaciones: formData.get('observaciones'), estado: 'pendiente'
                };
                const btnSubmit = formNueva.querySelector('button[type="submit"]');
                const originalText = btnSubmit.innerHTML; btnSubmit.innerHTML = 'Guardando...'; btnSubmit.disabled = true;

                try {
                    await createReserva(data);
                    alert("Reserva creada con éxito en Supabase!");
                    formNueva.reset();
                    document.querySelector(".tab-btn[data-target='tab-lista']").click();
                    loadReservas();
                } catch (error) { alert('Error al crear reserva: ' + error.message); } finally { btnSubmit.innerHTML = originalText; btnSubmit.disabled = false; }
            });
        }
    }, 50);

    return "<style>" +
           " .tabs-header { display: flex; gap: 16px; border-bottom: 2px solid var(--border-color); margin-bottom: 24px; }" +
           " .tab-btn { padding: 12px 16px; font-weight: 600; color: var(--text-secondary); position: relative; }" +
           " .tab-btn:hover, .tab-btn.active { color: var(--primary); }" +
           " .tab-btn.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background-color: var(--primary); }" +
           " .tab-content { display: none; } .tab-content.active-content { display: block; }" +
           " .filter-bar { display: flex; gap: 12px; margin-bottom: 24px; align-items: center; flex-wrap: wrap; }" +
           " .input-group { display: flex; flex-direction: column; gap: 4px; }" +
           " .input-group input, .input-group select, .input-group textarea { padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius); background-color: var(--bg-main); font-family: inherit; }" +
           "</style>" +
           "<div class='card'>" +
           "  <div class='tabs-header'>" +
           "    <button class='tab-btn active' data-target='tab-lista'>Lista de Reservas</button>" +
           "    <button class='tab-btn' data-target='tab-nueva'>Nueva Reserva</button>" +
           "  </div>" +
           "  <div id='tab-lista' class='tab-content active-content'>" +
           "    <div class='filter-bar'><button class='btn btn-primary' onclick=\"document.querySelector('.tab-btn[data-target=\\'tab-nueva\\']').click()\"><i class='ph ph-plus'></i> Nueva Reserva</button></div>" +
           "    <div class='table-container'><table><thead><tr><th>Nombre Cliente</th><th>Fechas</th><th># Personas</th><th>Estado</th><th>Total</th><th>Saldo</th><th>Acción</th></tr></thead>" +
           "    <tbody id='reservas-tbody'></tbody></table></div>" +
           "  </div>" +
           "  <div id='tab-nueva' class='tab-content'>" +
           "    <h3>Crear Nueva Reserva</h3>" +
           "    <form id='form-nueva-reserva'><div class='grid-cols-2' style='margin-bottom: 24px;'>" +
           "      <div class='input-group'><label>Nombre del Cliente</label><input type='text' name='nombre' required></div>" +
           "      <div class='input-group'><label>Teléfono</label><input type='text' name='telefono' required></div>" +
           "      <div class='input-group'><label>Fecha Entrada</label><input type='date' name='fecha_in' required></div>" +
           "      <div class='input-group'><label>Fecha Salida</label><input type='date' name='fecha_out' required></div>" +
           "      <div class='input-group'><label># Personas</label><input type='number' name='personas' value='2' required></div>" +
           "      <div class='input-group'><label>Origen</label><select name='origen'><option>Directo</option></select></div>" +
           "      <div class='input-group'><label>Precio Total</label><input type='number' name='precio' required></div>" +
           "      <div class='input-group'><label>Anticipo</label><input type='number' name='anticipo' value='0' required></div>" +
           "    </div><button type='submit' class='btn btn-primary'>Guardar Reserva</button></form>" +
           "  </div>" +
           "</div>";
}

function CalendarioView() { return "<div class='card'><h3>Calendario</h3><p>Módulo en desarrollo.</p></div>"; }
function FinanzasView() { return "<div class='card'><h3>Finanzas</h3><p>Módulo en desarrollo.</p></div>"; }
function IngresosView() { return "<div class='card'><h3>Ingresos</h3><p>Módulo en desarrollo.</p></div>"; }
function GastosView() { return "<div class='card'><h3>Gastos</h3><p>Módulo en desarrollo.</p></div>"; }
function PagosView() { return "<div class='card'><h3>Pagos</h3><p>Módulo en desarrollo.</p></div>"; }
function MantenimientoView() { return "<div class='card'><h3>Mantenimiento</h3><p>Módulo en desarrollo.</p></div>"; }
function AjustesView() { return "<div class='card'><h3>Ajustes</h3><p>Módulo en desarrollo.</p></div>"; }

// ==========================================
// 5. RUTAS Y CORE
// ==========================================
const routes = {
    '/dashboard': { title: 'Dashboard', view: DashboardView },
    '/reservas': { title: 'Reservas', view: ReservasView },
    '/calendario': { title: 'Calendario', view: CalendarioView },
    '/finanzas': { title: 'Finanzas', view: FinanzasView },
    '/ingresos': { title: 'Ingresos', view: IngresosView },
    '/gastos': { title: 'Gastos', view: GastosView },
    '/pagos': { title: 'Pagos', view: PagosView },
    '/mantenimiento': { title: 'Mantenimiento', view: MantenimientoView },
    '/ajustes': { title: 'Ajustes', view: AjustesView }
};

const contentEl = document.getElementById('app-content');
const titleEl = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-item');

function navigateTo(path) {
    if (!routes[path]) path = '/dashboard';
    const route = routes[path];
    if(titleEl) { titleEl.textContent = route.title; }
    
    if(navItems) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-path') === path) item.classList.add('active');
        });
    }
    
    if(contentEl) {
        contentEl.innerHTML = typeof route.view === 'function' ? route.view() : '';
    }
}

window.addEventListener('hashchange', function() { navigateTo(window.location.hash.replace('#', '') || '/dashboard'); });

document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.hash || window.location.hash === '#/') window.location.hash = '#/dashboard';
    else navigateTo(window.location.hash.replace('#', ''));
});
