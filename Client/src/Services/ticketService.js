import API from '../API/Instance';

export const ticketService = {
    createTicket: async function(tickets, token) {
      try {
        const response = await API.post(`/ticket/`, tickets, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(`Error comprando el ticket: `, error);
        throw error;
      }
    },

    getTicketsByUser: async function(token, size, page) {
      try {
        const response = await API.get(`/ticket/user-tickets`, {
          params: {
            size: size,
            page: page
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(`Error obteniendo los tickets: `, error);
        throw error;
      }
    }
  };
  