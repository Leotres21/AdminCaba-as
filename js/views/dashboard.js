export default function DashboardView() {
    // Se retorna un string de HTML y luego en app.js podemos inyectarlo
    // Usaremos CSS styles que definimos en styles.css

    // Importante: setTimeout para renderizar gráfica Chart.js luego de que el DOM está inyectado
    setTimeout(() => {
        const ctx = document.getElementById('revenueChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Ingresos',
                            data: [1200, 1900, 3000, 2500, 3200, 3800],
                            backgroundColor: '#10B981', // --primary
                            borderRadius: 4
                        },
                        {
                            label: 'Gastos',
                            data: [800, 1100, 1400, 900, 1200, 1500],
                            backgroundColor: '#EF4444', // --danger
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        }
    }, 100);

    return `
        <div class="dashboard-container" style="display:flex; flex-direction:column; gap:24px;">
            
            <!-- KPIs -->
            <div class="grid-cols-4">
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Reservas de Hoy</div>
                    <div style="font-size: 1.75rem; font-weight: 700; margin-top: 8px;">3</div>
                </div>
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Ingresos del Mes</div>
                    <div style="font-size: 1.75rem; font-weight: 700; margin-top: 8px; color: var(--primary)">$4.250</div>
                </div>
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Gastos del Mes</div>
                    <div style="font-size: 1.75rem; font-weight: 700; margin-top: 8px; color: var(--danger)">$1.150</div>
                </div>
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Ocupación</div>
                    <div style="font-size: 1.75rem; font-weight: 700; margin-top: 8px; color: var(--warning)">85%</div>
                </div>
            </div>

            <!-- Main Chart Area -->
            <div class="grid-cols-3" style="grid-template-columns: 2fr 1fr;">
                <div class="card" style="height: 400px; display:flex; flex-direction:column;">
                    <h3 style="margin-bottom: 24px;">Ingresos vs Gastos</h3>
                    <div style="flex:1; position:relative;">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 24px;">Próximas Entradas</h3>
                    <div style="display:flex; flex-direction:column; gap:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
                            <div>
                                <div style="font-weight: 600;">Juan Pérez</div>
                                <div style="font-size:0.8rem; color:var(--text-secondary)">Cabaña Los Pinos • 2 Noches</div>
                            </div>
                            <span class="badge success">Hoy</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
                            <div>
                                <div style="font-weight: 600;">María López</div>
                                <div style="font-size:0.8rem; color:var(--text-secondary)">Cabaña El Valle • 3 Noches</div>
                            </div>
                            <span class="badge warning">Mañana</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reservas Table -->
            <div class="card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
                    <h3>Últimas Reservas</h3>
                    <button class="btn btn-outline" onclick="window.location.hash='#/reservas'">Ver Todas</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Fecha Entrada</th>
                                <th>Fecha Salida</th>
                                <th>Valor</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Carlos Ramírez</td>
                                <td>15/10/2023</td>
                                <td>18/10/2023</td>
                                <td>$1,200</td>
                                <td><span class="badge success">Confirmado</span></td>
                                <td><button class="icon-btn"><i class="ph ph-dots-three-outline-vertical"></i></button></td>
                            </tr>
                            <tr>
                                <td>Ana Gómez</td>
                                <td>20/10/2023</td>
                                <td>22/10/2023</td>
                                <td>$850</td>
                                <td><span class="badge warning">Pendiente</span></td>
                                <td><button class="icon-btn"><i class="ph ph-dots-three-outline-vertical"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    `;
}
