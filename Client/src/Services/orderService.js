import API from '../API/Instance';

export const orderService = {

    saveOrder : async function(order, token) {
        try {
            const response = await API.post(`/order`, order, {
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