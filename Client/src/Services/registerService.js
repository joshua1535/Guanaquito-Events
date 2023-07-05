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

    updateTransactionCode: async function (transactionCode, ticketCode, token) {

        console.log ("ticketCode: " + ticketCode);
        console.log ("transactionCode: " + transactionCode);
        console.log ("token: " + token);
        try {
          const response = await fetch('http://localhost:8080/register/update/transaction-code', {
            method: 'PATCH',
            body: JSON.stringify({
                transactionCode: transactionCode,
                ticketCode: ticketCode
              }),

            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (!response.ok) {
            throw new Error('Error al actualizar el código de transacción');
          }
      
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error('Error al actualizar el código de transacción:', error);
          throw error;
        }
      },

    getStatus: async function (token, ticketCode, transactionCode) {
        console.log("ticketCode: " + ticketCode);
        console.log("transactionCode: " + transactionCode);
        console.log("token: " + token);
        try {
          const response = await fetch(`http://localhost:8080/register/status?ticketCode=${ticketCode}&transactionCode=${transactionCode}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error('Error al obtener el estado:', error);
          throw error;
        }
      },

       validateTicket  : async function (transactionCode, token) {
        try {
          const response = await fetch('http://localhost:8080/register/validate-ticket', {
            method: 'PATCH',
            body: JSON.stringify({
                transactionCode: transactionCode,
              }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (!response.ok) {
            throw new Error('Error al actualizar el código de transacción');
          }
      
          const data = await response.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error('Error al actualizar el código de transacción:', error);
          throw error;
        }
        },
}


