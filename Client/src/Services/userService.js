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

    getAllUsers: async function (page = 0, size = 10, token) {
        try {
            const response = await API.get('/user/all', {
                params: {
                    page: page,
                    size: size
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getAllUsersByPermit: async function(code , page = 0, size = 10, token) {
    
        try {
          const response = await API.get(`/user/all-by-permit/${code}`, 
          {
            params: {
                page: page,
                size: size
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
          return response.data;
    
        } catch(error) {
          console.error(`Error obteniendo los usuarios por permisos ${code}: `, error);
          throw error;
        }
    },
    getAllUsersByPermit: async function(code, page = 0, size = 10, token) {
        try {
            const response = await API.get(`/user/all-by-permit/${code}`, 
            {
                params: {
                    page: page,
                    size: size
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch(error) {
            console.error(`Error obteniendo los usuarios por permiso ${code}: `, error);
            throw error;
        }
    },
    findAllUsersByEvent: async function(code, token) {
        try {
            const response = await API.get(`/user/event/${code}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch(error) {
            console.error(`Error obteniendo los usuarios por evento ${code}: `, error);
            throw error;
        }
    },
    deleteUserFromEvent: async function(eventCode, userCode, token) {
        try {
            const response = await API.delete('/user/event/delete', 
            { 
                data: {
                  eventCode: eventCode,
                  userCode: userCode
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch(error) {
            console.error(`Error eliminando el usuario ${userCode} del evento ${eventCode}: `, error);
            throw error;
        }
    }
    
         

};