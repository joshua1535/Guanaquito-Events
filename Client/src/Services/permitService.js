import API from '../API/Instance';

export const permitService = {
    getPermitsByUser: async function(code, token) {
    
        try {
          const response = await API.get(`/permit/all/user/${code}`, 
          {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
          return response.data;
    
        } catch(error) {
          console.error(`Error obteniendo los permisos para el usuario con código ${code}: `, error);
          throw error;
        }
    }  
}
