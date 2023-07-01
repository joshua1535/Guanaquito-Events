import API from '../API/Instance';

export const userService = {
    
    logIn: async function (identifier, password) {

        try {
            const response = await API.post('/auth/login', {
                identifier: identifier,
                password: password
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    },
    signUp: async function (email, password, profilePic) {

        try {

            const response = await API.post('/auth/signup', {
                email: email,
                password: password,
                profilePicture: profilePic
            });
    
            console.log(response.data);

            return response.data;

        } catch (error) {
            console.log(error);
        }
    },
    verifyToken: async function (token) {

        try {
            
            const response = await API.get('/auth/whoami',
                {
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

};