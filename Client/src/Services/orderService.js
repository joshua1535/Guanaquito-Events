import API from '../API/Instance';

export const orderService = {

    createOrder : async function(token, date) {
        try {
            const response = await API.post(`/order/`, {
                purchaseDate: date,
            }
            
            ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data;
            
        } catch(error) {
            console.error(`Error comprando el ticket: `, error);
            throw error;
        }
    },

    getOrdersByUser : async function(token, size, page) {

        try {
            const response = await API.get(`/order/user-orders`, {
                params: {
                    size: size,
                    page: page
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data;
        } catch(error) {
            console.error(`Error obteniendo los tickets: `, error);
            throw error;
        }
    }
}