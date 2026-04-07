export default function PagosView() {
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h3>Gestión de Pagos</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem;">Control de pagos a empleados o contratistas.</p>
                </div>
                <button class="btn btn-primary"><i class="ph ph-plus"></i> Registrar Pago</button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Persona</th>
                            <th>Cargo/Rol</th>
                            <th>Periodo / Descripción</th>
                            <th>Valor</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div style="font-weight: 600;">Jorge Martínez</div><div style="font-size: 0.8em; color: var(--text-secondary)">Aseo</div></td>
                            <td>Limpieza</td>
                            <td>15 al 30 de Octubre</td>
                            <td>$300</td>
                            <td><span class="badge success">Pagado</span></td>
                        </tr>
                        <tr>
                            <td><div style="font-weight: 600;">Pedro Sánchez</div><div style="font-size: 0.8em; color: var(--text-secondary)">Jardinería</div></td>
                            <td>Mantenimiento Verde</td>
                            <td>Semana 3 - Octubre</td>
                            <td>$100</td>
                            <td><span class="badge warning">Pendiente</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
