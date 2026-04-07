export default function MantenimientoView() {
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h3>Mantenimiento e Incidencias</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem;">Reportes de daños y programación de reparaciones.</p>
                </div>
                <button class="btn btn-primary" style="background-color: var(--warning); color: #000"><i class="ph ph-warning-circle"></i> Nueva Incidencia</button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha Reporte</th>
                            <th>Problema</th>
                            <th>Estado</th>
                            <th>Costo Estimado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>16/10/2023</td>
                            <td><div style="font-weight: 600;">Fuga en lavamanos</div><div style="font-size: 0.8em; color: var(--text-secondary)">Baño principal Cabaña 1</div></td>
                            <td><span class="badge danger">Urgente</span></td>
                            <td>$40</td>
                            <td><button class="btn btn-outline" style="font-size: 0.75rem;">Marcar Resuelto</button></td>
                        </tr>
                        <tr>
                            <td>10/10/2023</td>
                            <td><div style="font-weight: 600;">Pintura descascarada</div><div style="font-size: 0.8em; color: var(--text-secondary)">Fachada Cabaña 2</div></td>
                            <td><span class="badge success">Resuelto</span></td>
                            <td>$120</td>
                            <td><button class="icon-btn"><i class="ph ph-eye"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
