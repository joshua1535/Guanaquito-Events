import API from '../API/Instance';

export const tierService = {

    saveTier: async function (tierInfo, token) {

        try {
            
            const response = await API.post(`/tier/`, tierInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            
            console.log(response.data);
    
            return response.data;
    
        } catch (error) {
            
            console.error(error);
    
        }
    },
    
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