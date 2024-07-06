import API from "../API/Instance";

export const categoryService = {

    getAllCategories: async function (token) {
        try {
            const response = await API.get("/category/all", {
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