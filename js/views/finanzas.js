export default function FinanzasView() {
    return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
            <!-- Tarjetas Resumen -->
            <div class="grid-cols-3">
                <div class="card" style="border-left: 4px solid var(--primary);">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Total Ingresos (Año)</div>
                    <div style="font-size: 2rem; font-weight: 700; margin-top: 8px;">$45,200</div>
                </div>
                <div class="card" style="border-left: 4px solid var(--danger);">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Total Gastos (Año)</div>
                    <div style="font-size: 2rem; font-weight: 700; margin-top: 8px;">$12,450</div>
                </div>
                <div class="card" style="border-left: 4px solid #3B82F6;">
                    <div style="color: var(--text-secondary); font-size: 0.875rem;">Utilidad Neta (Año)</div>
                    <div style="font-size: 2rem; font-weight: 700; margin-top: 8px; color: #3B82F6;">$32,750</div>
                </div>
            </div>

            <!-- Reporte Mensual -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h3>Reporte Mensual</h3>
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-outline"><i class="ph ph-file-pdf"></i> PDF</button>
                        <button class="btn btn-outline"><i class="ph ph-file-xls"></i> Excel</button>
                    </div>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mes</th>
                                <th>Ingresos</th>
                                <th>Gastos</th>
                                <th>Utilidad</th>
                                <th>Margen (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Octubre 2023</td>
                                <td style="color: var(--primary); font-weight: 600;">$4,250</td>
                                <td style="color: var(--danger); font-weight: 600;">$1,150</td>
                                <td style="font-weight: 700;">$3,100</td>
                                <td>72%</td>
                            </tr>
                            <tr>
                                <td>Septiembre 2023</td>
                                <td style="color: var(--primary); font-weight: 600;">$3,800</td>
                                <td style="color: var(--danger); font-weight: 600;">$1,400</td>
                                <td style="font-weight: 700;">$2,400</td>
                                <td>63%</td>
                            </tr>
                            <tr>
                                <td>Agosto 2023</td>
                                <td style="color: var(--primary); font-weight: 600;">$5,100</td>
                                <td style="color: var(--danger); font-weight: 600;">$900</td>
                                <td style="font-weight: 700;">$4,200</td>
                                <td>82%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
