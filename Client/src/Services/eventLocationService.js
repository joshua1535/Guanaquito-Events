import API from "../API/Instance";

export const eventLocationService = {

    getAllLocations: async function (token) {
        try {
            const response = await API.get("/event-locations/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
};