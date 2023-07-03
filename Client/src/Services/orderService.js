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
    }
}