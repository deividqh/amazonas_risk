/**
 * js/api.js
 * Módulo de conexión externa.
 */

const API_CONFIG = {
    lat: -3.4653, // Coordenadas del corazón de la selva amazónica
    lon: -62.2159,
    param: 'T2M'  // Temperatura a 2 metros de altura
};

/**
 * Obtiene la climatología de la NASA.
 * @returns {Promise<Object>} Promesa con los datos JSON.
 */
async function fetchAmazonClimateData() {
    const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=${API_CONFIG.param}&community=AG&longitude=${API_CONFIG.lon}&latitude=${API_CONFIG.lat}&format=JSON`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fallo crítico en la petición API:", error);
        throw error; // Lanzamos el error para que main.js lo capture y muestre en pantalla
    }
}