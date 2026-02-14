/**
 * main.js
 * Controlador principal de la interfaz.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    const loader = document.getElementById('loader');
    const panel = document.querySelector('.temperature-panel');
    const content = document.getElementById('temperature-content');
    const tempValue = document.getElementById('temp-value');
    const tempLabel = document.getElementById('temp-label');
    const tempDesc = document.getElementById('temp-desc');
    const errorMessage = document.getElementById('error-message');

    try {
        const data = await fetchAmazonClimateData();
        const annualTemp = Number(data.properties.parameter.T2M.ANN);

        loader.classList.add('d-none');
        content.classList.remove('d-none');

        animateTemperatureValue(tempValue, annualTemp);
        applyTemperatureState(panel, tempLabel, tempDesc, annualTemp);
    } catch (error) {
        loader.classList.add('d-none');
        errorMessage.textContent = 'No se pudo obtener la lectura climática. Verifica tu conexión e inténtalo de nuevo.';
        errorMessage.classList.remove('d-none');
    }
}
