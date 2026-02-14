/**
 * main.js
 * Controlador de la interfaz de usuario.
 */

// Esperamos a que el HTML esté completamente cargado en el móvil
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // Referencias a los elementos del DOM (HTML)
    const loader = document.getElementById('loader');
    const tempValue = document.getElementById('temp-value');
    const tempDesc = document.getElementById('temp-desc');
    const errorMessage = document.getElementById('error-message');

    try {
        // Llamamos a la función alojada en js/api.js
        const data = await fetchAmazonClimateData();
        
        // Extraemos el dato exacto: Promedio Anual (ANN) de la temperatura
        const annualTemp = data.properties.parameter.T2M.ANN;
        
        // 1. Ocultamos el loader
        loader.classList.add('d-none');
        
        // 2. Inyectamos los datos reales
        tempValue.textContent = `${annualTemp}°C`;
        
        // 3. Mostramos los elementos
        tempValue.classList.remove('d-none');
        tempDesc.classList.remove('d-none');

    } catch (error) {
        // Manejo de errores a prueba de fallos
        loader.classList.add('d-none');
        errorMessage.textContent = 'No se pudo conectar con el satélite climático. Revisa tu conexión a internet.';
        errorMessage.classList.remove('d-none');
    }
}