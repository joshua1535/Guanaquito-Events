import API from '../API/Instance';

export const registerService = {

    getRegisterByTicketCode: async function (ticketCode, token) {
        try {
            const response = await API.get(`/register/ticket/${ticketCode}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener registro:', error);
            throw error;
        }
    },
    
    saveTicket : async function (ticketCode, transactionCode, token) {
        try {
            const response = await API.post(`/register/`, 
            {
                transactionCode: transactionCode,
                ticketCode: ticketCode
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al generar qr:', error);
            throw error;
        }
    },

    updateTransactionCode : async function (ticketCode, transactionCode, token) {
        try {
            const response = await API.put(`/register/update/transaction-code`, 
                {
                    transactionCode: transactionCode,
                    ticketCode: ticketCode
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar código de transacción:', error);
            throw error;
        }
    }
}
