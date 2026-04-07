export default function AjustesView() {
    return `
        <div class="card">
            <h3 style="margin-bottom: 24px;">Configuración de la Cabaña</h3>
            
            <div class="grid-cols-2" style="gap: 40px;">
                <form style="display: flex; flex-direction: column; gap: 16px;" onsubmit="event.preventDefault()">
                    <h4>Datos Generales</h4>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 0.875rem; font-weight: 500;">Nombre Comercial</label>
                        <input type="text" value="Cabañas El Paraíso" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 0.875rem; font-weight: 500;">Teléfono de Contacto</label>
                        <input type="text" value="+57 300 123 4567" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 0.875rem; font-weight: 500;">Dirección / Ubicación</label>
                        <input type="text" value="Km 5 Vía Principal" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                    </div>
                    <button type="submit" class="btn btn-primary" style="align-self: flex-start; margin-top: 16px;">Guardar Cambios</button>
                </form>

                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h4>Logo y Marca</h4>
                    <div style="display: flex; align-items: center; gap: 24px;">
                        <div style="width: 100px; height: 100px; background-color: var(--bg-main); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px dashed var(--border-color);">
                            <i class="ph ph-image" style="font-size: 2rem; color: var(--text-muted);"></i>
                        </div>
                        <button class="btn btn-outline"><i class="ph ph-upload-simple"></i> Subir Logo</button>
                    </div>

                    <h4 style="margin-top: 24px;">Políticas (Checkout)</h4>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 0.875rem; font-weight: 500;">Hora de Check-in</label>
                        <input type="time" value="15:00" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius); width: 150px;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 0.875rem; font-weight: 500;">Hora de Check-out</label>
                        <input type="time" value="12:00" style="padding: 10px; border: 1px solid var(--border-color); border-radius: var(--border-radius); width: 150px;">
                    </div>
                </div>
            </div>
        </div>
    `;
}
