import axios from 'axios';

export const osrmService = {

    
    getRouteData : async function({startLat, startLon, endLat, endLon}) {

        try {
            const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${startLat},${startLon};${endLat},${endLon}?overview=full&geometries=geojson`
            );
            console.log(response.data);
            return response.data;
        } catch(error) {
            console.error(`Error obteniendo la ruta: `, error);
            throw error;
        }
    }
}