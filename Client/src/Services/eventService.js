import API from "../API/Instance";

export const eventService = {
    // ... otros métodos del servicio ...

    saveEvent: async function (eventData, token) {
        try {
            const response = await API.post("/event/", eventData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error; // esta línea permitirá que puedas manejar el error en el lugar donde se llama a saveEvent
        }
    },

    getAllEvents: async function (token, page, size) {
        try {
            const response = await API.get("/event/all", {
                params: {
                    page: page,
                    size: size,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getAllCurrentEvents: async function (token) {
        try {
            const response = await API.get("/event/active", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    updateEvent: async function (event, token) {
        try {
            const response = await API.patch("/event/update", event, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    changeEventStatus: async function (eventCode, token) {
        try {
            const response = await fetch(
                `https://software-api.onrender.com/event/status/${eventCode}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (error.response) {
                // La solicitud se hizo y el servidor respondió con un estado de error
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // La solicitud se hizo pero no se recibió ninguna respuesta
                console.log(error.request);
            } else {
                // Algo sucedió en la configuración de la solicitud que desencadenó un Error
                console.log("Error", error.message);
            }
            throw error;
        }
    },
    getEventsByCategory: async function (code, page = 0, size = 10, token) {
        try {
            const response = await API.get(`/event/category/${code}`, {
                params: {
                    page: page,
                    size: size,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getCurrentEvents: async function (page = 0, size = 10, token) {
        try {
            const response = await API.get(`/event/current`, {
                params: {
                    page: page,
                    size: size,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getEventById: async function (id, token) {
        try {
            const response = await API.get(`/event/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    addUserToEvent: async function (eventCode, userCode, token) {
        try {
            const response = await API.post(
                "/event/user",
                {
                    eventCode: eventCode,
                    userCode: userCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(`Error agregando el usuario al evento: `, error);
            throw error;
        }
    },
};
