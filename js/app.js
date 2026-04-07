import DashboardView from './views/dashboard.js';
import ReservasView from './views/reservas.js';
import CalendarioView from './views/calendario.js';
import FinanzasView from './views/finanzas.js';
import IngresosView from './views/ingresos.js';
import GastosView from './views/gastos.js';
import PagosView from './views/pagos.js';
import MantenimientoView from './views/mantenimiento.js';
import AjustesView from './views/ajustes.js';

// Mapa de Rutas Simple
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

// Referencias al DOM
const contentEl = document.getElementById('app-content');
const titleEl = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-item');

// Función Principal de Navegación
function navigateTo(path) {
    if (!routes[path]) {
        path = '/dashboard'; // Redirección por defecto
        window.location.hash = path;
    }

    const route = routes[path];
    titleEl.textContent = route.title;
    
    // Marcar navegación activa
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-path') === path) {
            item.classList.add('active');
        }
    });

    // Renderizar Vista
    contentEl.innerHTML = typeof route.view === 'function' ? route.view() : '';
    
    // Si la vista retorna un componente con init() para montar gráficos y eventos
    if (route.view.init) {
        // En un mundo ideal, view() es HTML string y view.init() acopla los listeners
        // Aquí si route.view es objeto o función con prototype podemos mejorar.
        // Adaptación sencilla:
    }
}

// Router Event Listener
window.addEventListener('hashchange', () => {
    const path = window.location.hash.replace('#', '') || '/dashboard';
    navigateTo(path);
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Si es raíz, forzar dashboard
    if (!window.location.hash || window.location.hash === '#/') {
        window.location.hash = '#/dashboard';
    } else {
        const path = window.location.hash.replace('#', '');
        navigateTo(path);
    }
});
