import API from '../API/Instance';

export const tierService = {
    getTiersbyEvent : async function(eventId, token) {
        try {
            const response = await API.get(`/tier/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log (response.data);
            return response.data;
        }
        catch(error) {
            console.error(`Error obteniendo los tiers: `, error);
            throw error;
        }
    }
}