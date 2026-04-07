export default function GastosView() {
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h3>Control de Gastos</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem;">Registra compras, servicios y demás salidas de dinero.</p>
                </div>
                <button class="btn btn-primary" style="background-color: var(--danger);"><i class="ph ph-plus"></i> Nuevo Gasto</button>
            </div>
            
            <div class="filter-bar" style="display: flex; gap: 12px; margin-bottom: 24px;">
                <input type="text" placeholder="Buscar gasto..." style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius); min-width: 250px;">
                <select style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                    <option>Categoría (Todas)</option>
                    <option>Servicios Fijos</option>
                    <option>Insumos</option>
                    <option>Mantenimiento</option>
                </select>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Categoría</th>
                            <th>Proveedor</th>
                            <th>Valor</th>
                            <th>Soporte</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10/10/2023</td>
                            <td>Factura Luz Septiembre</td>
                            <td><span class="badge neutral">Servicios</span></td>
                            <td>Empresa Energía</td>
                            <td style="color: var(--danger); font-weight: 600;">$150</td>
                            <td><button class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem;"><i class="ph ph-paperclip"></i> Ver</button></td>
                        </tr>
                        <tr>
                            <td>05/10/2023</td>
                            <td>Compra de Jabón y Papel</td>
                            <td><span class="badge neutral">Insumos</span></td>
                            <td>Supermercado X</td>
                            <td style="color: var(--danger); font-weight: 600;">$80</td>
                            <td><button class="btn btn-outline" style="padding: 4px 8px; font-size: 0.75rem;"><i class="ph ph-paperclip"></i> Ver</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
