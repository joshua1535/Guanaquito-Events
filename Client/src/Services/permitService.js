import API from '../API/Instance';

export const permitService = {
  getAllPermitsByUser: async function (userCode, token) {
    try {
      const response = await API.get(`/permit/all/user/${userCode}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error al obtener todos los permisos por usuario:', error);
      throw error; // Puedes decidir manejar el error aquí o lanzarlo para manejarlo en otro lugar
    }
  },
  grantPermitToUser: async function(userCode, permitCode, token) {
    try {
      const response = await API.post(`/permit/${userCode}`, 
        {
          permitCode: permitCode
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al otorgar permiso al usuario:', error);
      throw error; 
    }
  },
  
  revokePermitToUser: async function(userCode, permitCode, token) {
    try {
      const response = await API.delete(`/permit/${userCode}`, 
        {
          permitCode: permitCode
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al quitar permiso al usuario:', error);
      throw error; 
    }
  },
  
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
