/**
 * js/acciones.js
 * Funciones de presentación para una UI clara y fácil de mantener.
 */

const TEMPERATURE_STATES = {
    fresh: {
        threshold: 24,
        label: 'Amazonas fresco',
        description: 'Una fase más templada de lo habitual para la cuenca amazónica.',
        className: 'state-fresh'
    },
    warm: {
        threshold: 28,
        label: 'Amazonas cálido',
        description: 'Condición típica: aire húmedo y calor constante durante gran parte del año.',
        className: 'state-warm'
    },
    hot: {
        label: 'Amazonas muy cálido',
        description: 'Escenario de mayor calor. La sensación térmica suele ser intensa.',
        className: 'state-hot'
    }
};

function getTemperatureState(temperature) {
    if (temperature < TEMPERATURE_STATES.fresh.threshold) {
        return TEMPERATURE_STATES.fresh;
    }

    if (temperature < TEMPERATURE_STATES.warm.threshold) {
        return TEMPERATURE_STATES.warm;
    }

    return TEMPERATURE_STATES.hot;
}

function applyTemperatureState(panel, label, description, temperature) {
    const state = getTemperatureState(temperature);

    panel.classList.remove('state-fresh', 'state-warm', 'state-hot');
    panel.classList.add(state.className);

    label.textContent = state.label;
    description.textContent = state.description;
}

function animateTemperatureValue(element, finalTemperature) {
    const durationMs = 900;
    const start = performance.now();

    function tick(timestamp) {
        const progress = Math.min((timestamp - start) / durationMs, 1);
        const value = finalTemperature * progress;
        element.textContent = `${value.toFixed(1)}°C`;

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }

    requestAnimationFrame(tick);
}
