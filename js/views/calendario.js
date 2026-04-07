export default function CalendarioView() {
    return `
        <div class="card" style="height: 100%; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h3 style="margin-bottom: 4px;">Calendario de Reservas</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem;">Visualiza y gestiona las disponibilidades.</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span style="width: 12px; height: 12px; border-radius: 50%; background-color: var(--primary);"></span>
                        <span style="font-size: 0.875rem; color: var(--text-secondary);">Confirmado</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span style="width: 12px; height: 12px; border-radius: 50%; background-color: var(--warning);"></span>
                        <span style="font-size: 0.875rem; color: var(--text-secondary);">Pendiente</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span style="width: 12px; height: 12px; border-radius: 50%; background-color: var(--neutral);"></span>
                        <span style="font-size: 0.875rem; color: var(--text-secondary);">Bloqueado</span>
                    </div>
                </div>
            </div>
            
            <div style="flex: 1; border: 1px solid var(--border-color); border-radius: var(--border-radius); background-color: #F9FAFB; display: flex; align-items: center; justify-content: center; min-height: 400px;">
                <div style="text-align: center; color: var(--text-muted);">
                    <i class="ph ph-calendar-blank" style="font-size: 3rem; margin-bottom: 12px;"></i>
                    <p>Aquí se integrará una librería de calendario (ej. FullCalendar).</p>
                    <button class="btn btn-primary" style="margin-top: 16px;">Sincronizar Airbnb / Booking</button>
                </div>
            </div>
        </div>
    `;
}
