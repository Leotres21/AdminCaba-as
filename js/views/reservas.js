import { getReservas, createReserva } from '../services/reservasService.js';
import { formatCOP, formatDate, calcSaldo } from '../utils/formatters.js';

export default function ReservasView() {
    
    // --- LÓGICA DINÁMICA POST-RENDER ---
    setTimeout(() => {
        // 1. Lógica de Pestañas
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active-content'));
                tab.classList.add('active');
                document.getElementById(target).classList.add('active-content');
            });
        });

        // 2. Cargar Reservas desde Supabase
        const loadReservas = async () => {
            const tableBody = document.getElementById('reservas-tbody');
            if(!tableBody) return;
            
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center">Cargando reservas...</td></tr>';
            
            try {
                const reservas = await getReservas();
                
                if(reservas.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center">No hay reservas registradas.</td></tr>';
                    return;
                }

                tableBody.innerHTML = reservas.map(res => {
                    const saldo = calcSaldo(res.precio_total, res.anticipo);
                    // Determinar clases de bagde
                    let badgeClass = 'neutral';
                    if(res.estado === 'confirmado') badgeClass = 'success';
                    if(res.estado === 'pendiente') badgeClass = 'warning';
                    if(res.estado === 'cancelado') badgeClass = 'danger';

                    return \`
                        <tr>
                            <td>
                                <div style="font-weight:600">\${res.nombre_cliente}</div>
                                \${res.telefono_cliente ? \`<div style="font-size:0.8rem; color:var(--text-secondary)">\${res.telefono_cliente}</div>\` : ''}
                            </td>
                            <td>
                                <div>In: \${formatDate(res.fecha_entrada)}</div>
                                <div style="font-size:0.8rem; color:var(--text-secondary)">Out: \${formatDate(res.fecha_salida)}</div>
                            </td>
                            <td>\${res.numero_personas}</td>
                            <td><span class="badge \${badgeClass}">\${res.estado}</span></td>
                            <td>\${formatCOP(res.precio_total)}</td>
                            <td><span style="\${saldo > 0 ? 'color:var(--danger); font-weight:600' : 'color:var(--text-secondary)'}">\${formatCOP(saldo)}</span></td>
                            <td>
                                <button class="icon-btn" title="Detalle"><i class="ph ph-eye"></i></button>
                                <button class="icon-btn" title="Editar"><i class="ph ph-pencil-simple"></i></button>
                            </td>
                        </tr>
                    \`;
                }).join('');
            } catch (error) {
                tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:red">Error al cargar listado. (¿Configuraste las credenciales?)</td></tr>';
            }
        };

        // Ejecutar carga inicial
        loadReservas();

        // 3. Lógica de Nueva Reserva (Guardar en Supabase)
        const formNueva = document.getElementById('form-nueva-reserva');
        if(formNueva) {
            formNueva.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Recopilar datos
                const formData = new FormData(formNueva);
                const data = {
                    nombre_cliente: formData.get('nombre'),
                    telefono_cliente: formData.get('telefono'),
                    fecha_entrada: formData.get('fecha_in'),
                    fecha_salida: formData.get('fecha_out'),
                    numero_personas: parseInt(formData.get('personas')),
                    origen_reserva: formData.get('origen'),
                    precio_total: parseFloat(formData.get('precio')),
                    anticipo: parseFloat(formData.get('anticipo')),
                    observaciones: formData.get('observaciones'),
                    estado: 'pendiente' // Por defecto
                };

                const btnSubmit = formNueva.querySelector('button[type="submit"]');
                const originalText = btnSubmit.innerHTML;
                btnSubmit.innerHTML = 'Guardando...';
                btnSubmit.disabled = true;

                try {
                    await createReserva(data);
                    alert("Reserva creada con éxito en Supabase!");
                    formNueva.reset();
                    // Regresar a la pestaña lista y recargar
                    document.querySelector('.tab-btn[data-target="tab-lista"]').click();
                    loadReservas();
                } catch (error) {
                    alert('Error al crear reserva: Ver consola');
                    console.error(error);
                } finally {
                    btnSubmit.innerHTML = originalText;
                    btnSubmit.disabled = false;
                }
            });
        }

    }, 50);

    // --- TEMPLATE HTML ---
    return `
        <style>
            .tabs-header {
                display: flex;
                gap: 16px;
                border-bottom: 2px solid var(--border-color);
                margin-bottom: 24px;
            }
            .tab-btn {
                padding: 12px 16px;
                font-weight: 600;
                color: var(--text-secondary);
                position: relative;
            }
            .tab-btn:hover, .tab-btn.active {
                color: var(--primary);
            }
            .tab-btn.active::after {
                content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
                height: 2px; background-color: var(--primary);
            }
            .tab-content { display: none; }
            .tab-content.active-content { display: block; }
            .filter-bar { display: flex; gap: 12px; margin-bottom: 24px; align-items: center; flex-wrap: wrap; }
            .input-group { display: flex; flex-direction: column; gap: 4px; }
            .input-group input, .input-group select, .input-group textarea {
                padding: 10px; border: 1px solid var(--border-color);
                border-radius: var(--border-radius); background-color: var(--bg-main); font-family: inherit;
            }
        </style>
        
        <div class="card">
            <div class="tabs-header">
                <button class="tab-btn active" data-target="tab-lista">Lista de Reservas</button>
                <button class="tab-btn" data-target="tab-nueva">Nueva Reserva</button>
                <button class="tab-btn" data-target="tab-historial">Historial</button>
            </div>

            <!-- TAB: LISTA DE RESERVAS -->
            <div id="tab-lista" class="tab-content active-content">
                <div class="filter-bar">
                    <div class="input-group">
                        <input type="text" placeholder="Buscar por nombre o tel..." style="width: 250px;">
                    </div>
                    <div class="input-group">
                        <select>
                            <option value="">Estado (Todos)</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <input type="date" title="Fecha inicio">
                    </div>
                    <button class="btn btn-outline" style="margin-top:auto"><i class="ph ph-funnel"></i> Filtrar</button>
                    <button class="btn btn-primary" style="margin-left:auto" onclick="document.querySelector('.tab-btn[data-target=\\'tab-nueva\\']').click()">
                        <i class="ph ph-plus"></i> Nueva Reserva
                    </button>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre Cliente</th>
                                <th>Fechas</th>
                                <th># Personas</th>
                                <th>Estado</th>
                                <th>Total (COP)</th>
                                <th>Saldo (COP)</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody id="reservas-tbody">
                            <!-- Inyectado por Vanilla JS -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- TAB: NUEVA RESERVA -->
            <div id="tab-nueva" class="tab-content">
                <h3>Crear Nueva Reserva</h3>
                <p style="color:var(--text-secondary); margin-bottom:24px">Completa los datos del cliente y estadía.</p>
                
                <form id="form-nueva-reserva">
                    <div class="grid-cols-2" style="margin-bottom: 24px;">
                        <div class="input-group">
                            <label>Nombre del Cliente</label>
                            <input type="text" name="nombre" required placeholder="Ej. Juan Pérez">
                        </div>
                        <div class="input-group">
                            <label>Teléfono</label>
                            <input type="text" name="telefono" required placeholder="Ej. +57 320 000 0000">
                        </div>
                        <div class="input-group">
                            <label>Fecha Entrada</label>
                            <input type="date" name="fecha_in" required>
                        </div>
                        <div class="input-group">
                            <label>Fecha Salida</label>
                            <input type="date" name="fecha_out" required>
                        </div>
                        <div class="input-group">
                            <label>Número de Personas</label>
                            <input type="number" name="personas" min="1" max="15" value="2" required>
                        </div>
                        <div class="input-group">
                            <label>Origen</label>
                            <select name="origen">
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Booking">Booking</option>
                                <option value="Airbnb">Airbnb</option>
                                <option value="Directo">Directo</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label>Precio Total</label>
                            <input type="number" name="precio" required placeholder="Ej. 120000">
                        </div>
                        <div class="input-group">
                            <label>Anticipo (Abono previo)</label>
                            <input type="number" name="anticipo" required placeholder="Ej. 50000" value="0">
                        </div>
                    </div>
                    
                    <div class="input-group" style="margin-bottom: 24px;">
                        <label>Observaciones</label>
                        <textarea name="observaciones" style="min-height:80px;"></textarea>
                    </div>

                    <div style="display:flex; justify-content:flex-end; gap:12px;">
                        <button type="button" class="btn btn-outline" onclick="document.querySelector('.tab-btn[data-target=\\'tab-lista\\']').click()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Reserva</button>
                    </div>
                </form>
            </div>

            <!-- TAB: HISTORIAL -->
            <div id="tab-historial" class="tab-content">
                <h3>Historial de Reservas Cerradas</h3>
                <p style="color:var(--text-secondary); margin-bottom:24px">Reservas que ya completaron su ciclo.</p>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Fechas</th>
                                <th>Valor Final</th>
                                <th>Estado Final</th>
                                <th>Fecha Cierre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="5" style="text-align:center">Módulo en construcción (Próxima iteración)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    `;
}
