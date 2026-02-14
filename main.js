/**
 * main.js
 * Controlador principal de la interfaz.
 */

document.addEventListener('DOMContentLoaded', initApp);

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
        const annualTemp = Number(data?.properties?.parameter?.T2M?.ANN);

        if (!Number.isFinite(annualTemp)) {
            throw new Error('Dato de temperatura inválido');
        }

        hideElement(loader);
        showElement(content);

        animateTemperatureValue(tempValue, annualTemp);
        applyTemperatureState(panel, tempLabel, tempDesc, annualTemp);
    } catch (error) {
        hideElement(loader);
        errorMessage.textContent = 'No se pudo obtener la lectura climática. Verifica tu conexión e inténtalo de nuevo.';
        showElement(errorMessage);
    }
}

function hideElement(element) {
    element.classList.add('is-hidden');
}

function showElement(element) {
    element.classList.remove('is-hidden');
}
