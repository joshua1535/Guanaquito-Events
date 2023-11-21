import React, { useState, useEffect } from "react";
import {
  Carousel,
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Switch,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import imgtemplate from "../../assets/loginimg.png";
import classes from "./EditPermitUsers.module.css";
import { ChevronDownIcon, Bars2Icon, ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { permitService } from "../../Services/permitService";
import { userService } from "../../Services/userService";

function Toggle({ isChecked, onToggle }) {
  return (
    <div onClick={onToggle} style={{ cursor: "pointer", width: 40, height: 20, borderRadius: 20, backgroundColor: isChecked ? "lightgreen" : "lightgray", position: "relative", transition: "background-color 0.2s" }}>
      <div style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "white", position: "absolute", left: isChecked ? 20 : 0, transition: "left 0.2s" }}/>
    </div>
  );
}



const users = [
  {
    email: "jonathanmor215125ales@gmail.com",
    avatar: "https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png",
    permits: [
      { name: "Client", active: false },
      { name: "Ticket Validator", active: false },
      { name: "Stadistics", active: false },
      { name: "Event Administrator", active: false },
      { name: "Moderator", active: false },
      { name: "Admin", active: false },
    ],
  },
];

const availablePermits = [
  {
    name: "Client",
  },
  {
    name: "Ticket Validator",
  },
  {
    name: "Stadistics",
  },
  {
    name: "Event Administrator",
  },
  {
    name: "Moderator",
  },
  {
    name: "Admin",
  },
];

const permitNamesMap = {
  'databaseName1': 'Client',
  'databaseName2': 'Ticket Validator',
  'databaseName3': 'Stadistics',
  'databaseName4': 'Event Administrator',
  'databaseName5': 'Moderator',
  'databaseName6': 'Admin',

  // Continúa con el resto de los permisos...
};



//profile menu component
const profileMenuItems = [
  {
    label: "Administrar usuarios",
  },
  {
    label: "Sign Out",
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const handleMenuClick = (label) => {
  if (label === "Administrar usuarios") {
      navigate('/admin-users');
  } else if (label === "Sign Out") {
      logout();
      navigate('/');
  }
  };
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={ () => handleMenuClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <Typography
                as="span"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}




export default function EditPermitUsers() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [userList, setUserList] = useState([]);
  const [userfiltred, setUserfiltred] = useState([]); // Lista de permisos seleccionados por el usuario
  const [permits, setPermits] = useState([]);
  const { userCode } = useParams();
  const { user, token } = useUserContext(); // obteniendo token de contexto de usuario
  const [Client, setClient] = useState(false); // Lista de permisos seleccionados por el usuario
  const [page, setPage] = useState(0); // inicio de la pagina
  const [size, setSize] = useState(5); 

  const handleclient = () => 
  {
    setClient(!Client);
  }

const [permisoCliente, setPermisoCliente] = useState(false);
const [permisoVerEstadisticas, setPermisoVerEstadisticas] = useState(false);
const [permisoValidarTickets, setPermisoValidarTickets] = useState(false);
const [permisoAdministrarEventos, setPermisoAdministrarEventos] = useState(false);
const [permisoModerador, setPermisoModerador] = useState(false);
const [permisoAdmin, setPermisoAdmin] = useState(false);
// Continua con el resto de los permisos...
useEffect(() => {
  if(token){
    userService.getAllUsers(page,size,token)
        .then((data) => {
            setUserList(data.content);          
            console.log('evento obtenido:', user);
        })
        .catch((error) => {
            console.error('Hubo un error al obtener las eventos:', error);
        });
    }
}, [page,size,token]);

useEffect(() => {
userList.map((user) => {
  if(user.code === userCode){
    setUserfiltred(user);
  }
});
}, [userList,userCode]);


useEffect(() => {
  if(token){
    permitService.getAllPermits(token)
        .then((data) => {
             setPermits(data);          
            console.log('todos los permisos:', permits);
        })
        .catch((error) => {
            console.error('Hubo un error al obtener los permisos:', error);
        });
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
  
  // Ahora activePermits contiene todos los permisos que están activos.
  // Puedes enviarlos al back-end aquí:

};


const handleClienteClick = () => {
  setPermisoCliente(prevState => !prevState);
  console.log(permisoCliente);
  // Aquí podrías llamar a tu función para actualizar los permisos en el backend
};

const handleVerEstadisticasClick = () => {
  setPermisoVerEstadisticas(prevState => !prevState);
  console.log(permisoVerEstadisticas);
  // Aquí podrías llamar a tu función para actualizar los permisos en el backend
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

const viendo = () => {
  console.log(permisoCliente);
  console.log(permisoVerEstadisticas);

}

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





  console.log(userCode);
  const navigate = useNavigate();

  const handleSaveClick = () => {
    const updatedUserList = [...userList];
    const userIndex = updatedUserList.findIndex(
      (user) => user.email === selectedUser.email
    );
    updatedUserList[userIndex] = selectedUser;
    setUserList(updatedUserList);
    navigate('/admin-users');
  };


  const handleDisableAccount = () => {
    const updatedUser = { ...selectedUser };
    updatedUser.disabled = !updatedUser.disabled;
    setSelectedUser(updatedUser);

    const updatedUserList = [...userList];
    const userIndex = updatedUserList.findIndex(
      (user) => user.email === selectedUser.email
    );
    updatedUserList[userIndex] = updatedUser;
    setUserList(updatedUserList);

  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handlePermissionChange = (permitName) => {
    const updatedUser = { ...selectedUser };
    const permitIndex = updatedUser.permits.findIndex(
      (permit) => permit.name === permitName
    );
    updatedUser.permits[permitIndex].active = !updatedUser.permits[permitIndex]
      .active;
    setSelectedUser(updatedUser);
  };

  const handleAddPermission = (permitName) => {
    const updatedUser = { ...selectedUser };
    const permit = availablePermits.find((permit) => permit.name === permitName);
    if (permit) {
      updatedUser.permits.push({ name: permit.name, active: true });
      setSelectedUser(updatedUser);
    }
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
      <header className={[classes["headerContainer"]]}>
        <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
        <div className={[classes["headerTypography"]]}>
          <img src={logo} alt="logo" className="h-12 w-12 mx-4" />
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
          >
            Guanaco Business
          </Typography>
          
          <ProfileMenu />
          </div>
        </Navbar>
        </header>
      <div className={classes["bodyContainer"]}>
        <div className={classes["userPermitsContainer"]}>
          
          <div className=" sm:flex ">
          <div className={classes["userContainer"]}>
            
              <div
                
                className={classes["user"]}
              >
                <div className="flex justify-center ">
                <Avatar
                  src="https://s3.amazonaws.com/moonup/production/uploads/1670331935393-6312579fc7577b68d90a7646.png"
                  
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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