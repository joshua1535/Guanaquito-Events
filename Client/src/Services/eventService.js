import API from '../API/Instance';

export const eventService = {
    // ... otros métodos del servicio ...

    getAllEvents: async function(token) {
        try {
            const response = await API.get('/event/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getEventsByCategory: async function (code, page = 0, size = 10,token) {

        try {
            
            const response = await API.get(`/event/category/${code}`,
                {
                    params: {
                        page: page,
                        size: size
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            
            console.log(response.data);

            return response.data;

        } catch (error) {
            
            console.log(error);

        }
    },
}
