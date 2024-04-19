import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import classes from "./EditPermitUsers.module.css";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { permitService } from "../../Services/permitService";
import { userService } from "../../Services/userService";
import Header from "../../Components/Header/Header";
//profile menu component

export default function EditPermitUsers() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userfiltred, setUserfiltred] = useState([]);
  const [permits, setPermits] = useState([]);
  const { userCode } = useParams();
  const { user, token } = useUserContext();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [permisoCliente, setPermisoCliente] = useState(false);
  const [permisoVerEstadisticas, setPermisoVerEstadisticas] = useState(false);
  const [permisoValidarTickets, setPermisoValidarTickets] = useState(false);
  const [permisoAdministrarEventos, setPermisoAdministrarEventos] = useState(false);
  const [permisoModerador, setPermisoModerador] = useState(false);
  const [permisoAdmin, setPermisoAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      userService.getAllUsers(page, size, token)
        .then((data) => setUserList(data.content))
        .catch((error) => console.error('Hubo un error al obtener las eventos:', error));
    }
  }, [page, size, token]);

  useEffect(() => {
    userList.forEach((user) => {
      if (user.code === userCode) {
        setUserfiltred(user);
      }
    });
  }, [userList, userCode]);


useEffect(() => {
    if (token) {
      permitService.getAllPermits(token)
        .then((data) => setPermits(data))
        .catch((error) => console.error('Hubo un error al obtener los permisos:', error));
    }
  }, [token]);

const handleGuardarClick = () => {
  let client = "Client"
  let ticketVal = "Ticket Validator"
  let stadistics = "Stadistics"
  let eventAdmin = "Event Administrator"
  let moderator = "Moderator"
  let admin = "Admin"

  permits.map((permit) => {
    if(permit.name === client){
      client = permit.code;
      console.log('client:', client);
    }
    if(permit.name === ticketVal){
      ticketVal = permit.code;
      console.log('ticketVal:', ticketVal);
    }
    if(permit.name === stadistics){
      stadistics = permit.code;
      console.log('stadistics:', stadistics);
    }
    if(permit.name === eventAdmin){
      eventAdmin = permit.code;
      console.log('eventAdmin:', eventAdmin);
    }
    if(permit.name === moderator){
      moderator = permit.code;
      console.log('moderator:', moderator);
    }
    if(permit.name === admin){
      admin = permit.code;
      console.log('admin:', admin);
    }
  });
  if (permisoCliente) {
    permitService.grantPermitToUser(userCode, client, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  else
  {
    permitService.revokePermitToUser(userCode, client, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }

  if (permisoVerEstadisticas) {
    permitService.grantPermitToUser(userCode, stadistics, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  else
  {
    permitService.revokePermitToUser(userCode, stadistics, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }

  if (permisoValidarTickets) {
    permitService.grantPermitToUser(userCode, ticketVal, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  else
  {
    permitService.revokePermitToUser(userCode, ticketVal, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }


  if (permisoAdministrarEventos) {
    permitService.grantPermitToUser(userCode, eventAdmin, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  else
  {
    permitService.revokePermitToUser(userCode, eventAdmin, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }

  if (permisoModerador) {
    permitService.grantPermitToUser(userCode, moderator, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  else
  {
    permitService.revokePermitToUser(userCode, moderator, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }

  if (permisoAdmin) {
    permitService.grantPermitToUser(userCode, admin, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  else
  {
    permitService.revokePermitToUser(userCode, admin, token)
    .then(response => {
      console.log('Permisos actualizados con éxito:', response);
      navigate('/admin-users');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar los permisos:', error);
    });
  }
  
};


const handleClienteClick = () => {
  setPermisoCliente(prevState => !prevState);
  console.log(permisoCliente);
};

const handleVerEstadisticasClick = () => {
  setPermisoVerEstadisticas(prevState => !prevState);
  console.log(permisoVerEstadisticas);
};

const handleValidarTicketsClick = () => {
  setPermisoValidarTickets(prevState => !prevState);
  console.log(permisoValidarTickets);
};

const handleAdministrarEventosClick = () => {
  setPermisoAdministrarEventos(prevState => !prevState);
  console.log(permisoAdministrarEventos);
};

const handleModeradorClick = () => {
  setPermisoModerador(prevState => !prevState);
  console.log(permisoModerador);
};

const handleAdminClick = () => {
  setPermisoAdmin(prevState => !prevState);
  console.log(permisoAdmin);
};


useEffect(() => {
  permitService.getAllPermitsByUser(userCode, token)
    .then(data => {
      console.log('Permisos obtenidos:', data);
      
      // Actualizamos los estados de permisos según la respuesta de la API
      // Suponemos que los permisos se identifican por el "name"
      setPermisoCliente(data.some(permit => permit.name === "Client"));
      setPermisoVerEstadisticas(data.some(permit => permit.name === "Stadistics"));
      setPermisoValidarTickets(data.some(permit => permit.name === "Ticket Validator"));
      setPermisoAdministrarEventos(data.some(permit => permit.name === "Event Administrator"));
      setPermisoModerador(data.some(permit => permit.name === "Moderator"));
      setPermisoAdmin(data.some(permit => permit.name === "Admin"));
      // Continúa con el resto de los permisos...
    })
    .catch(error => {
      console.error('Hubo un error al obtener los permisos:', error);
    });
}, [userCode, token]); // Las dependencias de useEffect

  const navigate = useNavigate();


  const handleCancelClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    document.title = "Edit permits users";
  }, []);


  return (
    <div className={classes["generalContainer"]}>
      <Header/>
      <div className={classes["bodyContainer"]}>
        <div className={classes["userPermitsContainer"]}>
          
          <div className=" sm:flex ">
          <div className={classes["userContainer"]}>
            
              <div
                
                className={classes["user"]}
              >
                <div className="flex justify-center ">
                <Avatar
                  src={userfiltred.profilePicture}
                  
                  className="w-auto h-auto 
                  PC-1920*1080:w-screen
                  PC-1600*900:w-2/4 
                  PC-1280*720:w-44 "
                />
                </div>
                <div className={classes["emailContainer"]}>
                  <p>{userfiltred.email}</p>
                </div>
              </div>
              
            
          </div>

          <div className={classes["listPermitsContainer"]}>
          <div className={classes["permitListContainer"]}>
          <div className="flex flex-col w-full items-center justify-center" >
          <div 
              className={`p-2 m-2 flex w-full items-center justify-start "}`}
            >
              <Typography className="ml-2 m-4 font-bold text-white 
                PC-1920*1080:text-2.5xl   
                PC-1600*900:text-2xl PC-1600*900:w-full PC-1600*900:m-1 
                PC-1280*720:text-2xl PC-1280*720:w-full PC-1280*720:m-1">
                Permisos
              </Typography>              
            </div> 
            
            <div 
              style={{ cursor: "pointer" }}
              className={`p-2 m-2 w-1/2 flex items-center justify-center ${permisoCliente ? "border-4 border-green-500" : "border-4 opacity-40 border-red-500"}`}
              onClick={handleClienteClick}
            >
              <Typography className="ml-2 m-4 font-bold text-yellowCapas 
                PC-1920*1080:text-2xl 
                PC-1600*900:text-base PC-1600*900:m-1 
                PC-1280*720:text-sm PC-1280*720:m-1">
                Cliente
              </Typography>
            </div>

            <div 
              style={{ cursor: "pointer" }}
              className={`p-2 m-2 w-1/2 flex items-center justify-center ${permisoVerEstadisticas ? "border-4 border-green-500" : "border-4 opacity-40 border-red-500"}`}
              onClick={handleVerEstadisticasClick}
            >
              <Typography className="ml-2 m-4 font-bold text-yellowCapas 
                PC-1920*1080:text-2xl 
                PC-1600*900:text-base PC-1600*900:m-1 
                PC-1280*720:text-sm PC-1280*720:m-1">
                Estadistico
              </Typography>
            </div>

              <div 
              style={{ cursor: "pointer" }}
              className={`p-2 m-2 flex w-1/2 items-center justify-center ${permisoValidarTickets ? "border-4 border-green-500" : "border-4 opacity-40 border-red-500"}`}
              onClick={handleValidarTicketsClick}
            >
              <Typography className="ml-2 m-4 font-bold text-yellowCapas 
                PC-1920*1080:text-2xl 
                PC-1600*900:text-base PC-1600*900:m-1 
                PC-1280*720:text-sm PC-1280*720:m-1">
                Validador de Tickets
              </Typography>

              
            </div> 

              <div 
              style={{ cursor: "pointer" }}
              className={`p-2 m-2 flex w-1/2 items-center justify-center ${permisoAdministrarEventos ? "border-4 border-green-500" : "border-4 opacity-40 border-red-500"}`}
              onClick={handleAdministrarEventosClick}
            >
              <Typography className="ml-2 m-4 font-bold text-yellowCapas 
                PC-1920*1080:text-2xl 
                PC-1600*900:text-base PC-1600*900:m-1 
                PC-1280*720:text-sm PC-1280*720:m-1">
                Administrador de eventos
              </Typography>

              
            </div> 

              <div 
              style={{ cursor: "pointer" }}
              className={`p-2 m-2 flex w-1/2 items-center justify-center ${permisoModerador ? "border-4 border-green-500" : "border-4 opacity-40 border-red-500"}`}
              onClick={handleModeradorClick}
            >
              <Typography className="ml-2 m-4 font-bold text-yellowCapas 
                PC-1920*1080:text-2xl 
                PC-1600*900:text-base PC-1600*900:m-1 
                PC-1280*720:text-sm PC-1280*720:m-1">
                Moderador
              </Typography>

              
            </div> 

              <div 
              style={{ cursor: "pointer" }}
              className={`p-2 m-2 flex w-1/2 items-center justify-center ${permisoAdmin ? "border-4 border-green-500" : "border-4 opacity-40 border-red-500"}`}
              onClick={handleAdminClick}
            >
              <Typography className="ml-2 m-4 font-bold text-yellowCapas 
                PC-1920*1080:text-2xl 
                PC-1600*900:text-base PC-1600*900:m-1 
                PC-1280*720:text-sm PC-1280*720:m-1">
                Super Admin
              </Typography>

              
            </div>
            <div className={classes["buttonsContainer"]}>
            <div className={classes["buttonContainer"]}>
                <Button 
                onClick={handleCancelClick}
                className="mt-4 bg-black">
                    Cancelar
                </Button>
                <div className={classes["buttonContainer"]}>
                <Button 
                onClick={handleGuardarClick}
                className="mt-4 bg-yellowCapas" >
                    Guardar cambios
                </Button>
            </div>
            </div>
            </div>    

            </div>  
        </div>

          </div>
</div>
        </div>
      </div>
    </div>
  );
}