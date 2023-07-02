import API from '../API/Instance';

export const ticketService = {
    
    buyTicket : async function(ticket, token) {
        try {
            const response = await API.post(`/ticket`, ticket, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch(error) {
            console.error(`Error comprando el ticket: `, error);
            throw error;
        }
    }
}