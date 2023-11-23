import API from '../API/Instance';

export const permitService = {
  getAllPermits: async function(token) {
    try {
        const response = await API.get('/permit/all', {
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
      const response = await API.post(`/permit/`, 
        {
          permitCode: permitCode,
          userCode: userCode
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
      const response = await fetch('https://software-api.onrender.com/permit/delete',{
        "method": "DELETE",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          permitCode: permitCode,
          userCode: userCode
        })
      });

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
          console.log('Error', error.message);
      }
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
