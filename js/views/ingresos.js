export default function IngresosView() {
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h3>Registro de Ingresos</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem;">Todos los pagos recibidos (Reservas, Minibar, Daños, etc).</p>
                </div>
                <button class="btn btn-primary"><i class="ph ph-plus"></i> Nuevo Ingreso</button>
            </div>
            
            <div class="filter-bar" style="display: flex; gap: 12px; margin-bottom: 24px;">
                <input type="text" placeholder="Buscar concepto..." style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius); min-width: 250px;">
                <select style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                    <option>Tipo (Todos)</option>
                    <option>Reserva</option>
                    <option>Otros</option>
                </select>
                <input type="month" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Cliente asociado</th>
                            <th>Método</th>
                            <th>Valor</th>
                            <th>Aciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15/10/2023</td>
                            <td><span class="badge" style="background-color: #E0E7FF; color: #3730A3;">Reserva #405</span></td>
                            <td>Carlos Ramírez</td>
                            <td>Transferencia</td>
                            <td style="color: var(--primary); font-weight: 600;">$1,200</td>
                            <td><button class="icon-btn"><i class="ph ph-dots-three-outline-vertical"></i></button></td>
                        </tr>
                        <tr>
                            <td>12/10/2023</td>
                            <td><span class="badge neutral">Otros - Minibar</span></td>
                            <td>Ana Gómez</td>
                            <td>Efectivo</td>
                            <td style="color: var(--primary); font-weight: 600;">$25</td>
                            <td><button class="icon-btn"><i class="ph ph-dots-three-outline-vertical"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
