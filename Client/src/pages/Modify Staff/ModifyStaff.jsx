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
  Select,
  Option,
  Dialog,
  DialogHeader,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png";
import imgtemplate from "../../assets/loginimg.png";
import classes from "./ModifyStaff.module.css";
import {
    ChevronDownIcon,
    Bars2Icon,
    ArrowLeftIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import { userService } from '../../Services/userService';
import { permitService } from '../../Services/permitService';



const usersStaff = [
    {
        email: "danyfifitax@gmail.com",
        rol: ["Admin", "Scanner"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
    {
        email: "joshuamontano@gmail.com",
        rol: ["Admin", "Graficas"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
    {
        email: "jonathanmorales@gmail.com",
        rol: ["Scanner"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
    {
        email: "dasdsadasdx@gmail.com",
        rol: ["Admin", "Scanner"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
    {
        email: "danyfiasdasd12asdax@gmail.com",
        rol: ["Admin", "Scanner"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
    {
        email: "jonathaasdasdasd2s@gmail.com",
        rol: ["Scanner"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
    {
        email: "jonathanm213123dales@gmail.com",
        rol: ["Scanner"],
        avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
    },
];

const usersInEventDefault = [
        {
            email: "jonathanmor215125ales@gmail.com",
            rol: ["Scanner"],
            avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
        },
        {
            email: "jonathanmoral616es@gmail.com",
            rol: ["Scanner"],
            avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
        },
        {
            email: "danyfifit251515ax@gmail.com",
            rol: ["Admin", "Scanner"],
            avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
        },
        {
            email: "danyfifitasdad231ax@gmail.com",
            rol: ["Admin", "Scanner"],
            avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
        },
        {
            email: "danyfifita2qwasdax@gmail.com",
            rol: ["Admin", "Scanner"],
            avatar: "https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg"
        },
];


        

// profile menu component
const profileMenuItems = [
  {
    label: "Gestionar eventos",
  },
  {
    label: "Crear evento",
  },
  {
    label: "Sign Out",
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const handleMenuClick = (label) => {
  if (label === "Gestionar eventos") {
      navigate('/admin-event');
  } else if (label === "Crear evento") {
      navigate('/admin-event/createevent');
  } else if (label === "Sign Out") {
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

export default function ModifyStaff() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(usersStaff);
    const [selectedUser, setSelectedUser] = useState("");
    const [userList, setUserList] = useState([]);
    const [usersInEvent, setUsersInEvent] = useState([]);
    const [alreadyInList, setAlreadyInList] = useState(false);
    const { eventCode } = useParams();
    const { user,token } = useUserContext();
    const [event, setEvent] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersValid, setUsersValid] = useState([]);
    const [page, setPage] = useState(0); // inicio de la pagina
    const [size, setSize] = useState(5); 

    useEffect(() => {
      if(token){
        eventService.getEventById(eventCode,token)
            .then((data) => {
              setEvent(data);          
                console.log('evento obtenido:', event);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener las eventos:', error);
            });
        }
    }, [token]);

    useEffect(() => {
      if(token){
        userService.findAllUsersByEvent(eventCode,token)
            .then((data) => {
              setUsersInEvent(data);          
                console.log('usuarios del evento obtenidos:', data);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener usuarios del evento:', error);
            });
        }
    }, [eventCode,token]);



    useEffect(() => {
      if(token){
        userService.getAllUsers(page,size,token)
            .then((data) => {
                setUsers(data.content);          
                console.log('evento obtenido:', user);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener las eventos:', error);
            });
        }
    }, [page,size,token]);

    useEffect(() => {
      Promise.all(users.map(user =>
        permitService.getAllPermitsByUser(user.code, token)
          .then(data => {
            console.log('Permisos obtenidos:', data);
          
            // Actualizamos los estados de permisos según la respuesta de la API
            // Suponemos que los permisos se identifican por el "name"
            if (data.some(permit => permit.name === "Ticket Validator")) {
              return user;
            }
          })
          .catch(error => {
            console.error('Hubo un error al obtener los permisos:', error);
          })
      )).then(userArray => {
        const filteredUsers = userArray.filter(user => user !== undefined);
        setUsersValid(filteredUsers);
      });
    }, [users, token]); // Dependiendo de tus necesidades, puedes necesitar ajustar las dependencias
    
    console.log('users ticket validator:', usersValid);
    
      /*
      permitService.getAllPermitsByUser(userCode, token)
        .then(data => {
          console.log('Permisos obtenidos:', data);
          
          // Actualizamos los estados de permisos según la respuesta de la API
          // Suponemos que los permisos se identifican por el "name"
          setPermisoCliente(data.some(permit => permit.name === "Client"));

        })
        .catch(error => {
          console.error('Hubo un error al obtener los permisos:', error);
        });*/

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);
  
    useEffect(() => {
      document.title = "Modify Staff";
    }, []);
  
    const handleAddUser = (userCode) => {
      usersValid.map((user) => {
        if (userCode === user.email)
        {
          userCode = user.code;
        }
      });
      console.log('userCode:', userCode);

      if (userList.includes(selectedUser)) {
        setAlreadyInList(true);
        return;
      }
  
      if (selectedUser) {
        const selectedUserObj = usersValid.find((user) => user.email === selectedUser);
  
        setUserList((cur) => [...cur, selectedUser]);
  
        const newUsersInEvent = [
          ...usersInEvent,
          selectedUserObj
        ];
  
        setUsersInEvent(newUsersInEvent);
      }
      
      setSelectedUser("");
  
      const newUsers = usersValid.filter((user) => user.email !== selectedUser);
      setFilteredUsers(newUsers);
  
      if (searchValue) {
        const filteredUsers = newUsers.filter((user) =>
          user.email.includes(searchValue)
        );
        setFilteredUsers(filteredUsers);
      }
      
        // Primero, necesitas tener disponibles los códigos de usuario y evento. 
        // Estos podrían ser parte del estado de tu componente o podrían ser pasados como props.
        //const userCode = "875a5339-ce84-4d09-b24e-d9e716eb6d7a"; // ejemplo      
    
        // Luego, llama a la función de servicio. Asegúrate de que el token de autenticación esté disponible.
        eventService.addUserToEvent(eventCode,userCode
          , token)
            .then(response => {
                console.log('Usuario agregado al evento con éxito:', response);
    
                // Aquí puedes hacer cualquier actualización de estado adicional necesaria después de agregar el usuario al evento
            })
            .catch(error => {
                console.error('Hubo un error al agregar el usuario al evento:', error);
                // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
            });
    

    };
  

      const handleRemoveUser = (email,code) => {
        const newUsersInEvent = usersInEvent.filter((user) => user.email !== email);
        setUsersInEvent(newUsersInEvent);

        const userCode = code;
        console.log('userCode:', userCode);
        console.log('eventCode:', eventCode);
        
        userService.deleteUserFromEvent(eventCode,userCode, token)
        .then(response => {
            console.log('Usuario eliminado del evento con éxito:', response);
            
            // Aquí puedes manejar la respuesta, por ejemplo actualizando la lista de usuarios en tu estado de React para reflejar que el usuario ha sido eliminado.
        })
        .catch(error => {
            console.error(`Error al eliminar el usuario ${userCode} del evento ${eventCode}: `, error);
            // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario.
        });


      }


  return (
    <div className={[classes["generalContainer"]]}>
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
      <IconButton 
      onClick={handleBackClick}
      size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                <ArrowLeftIcon className="h-6 w-6 text-white" />
            </IconButton>
      <div className={[classes["bodyContainer"]]}>
      <div className={[classes["imgContainer"]]}>
          <img
            src={event.image}
            alt="eventImg"
            className={[classes["imgEvent"]]}>
            </img>
        <div className={[classes["imgTextContainer"]]}>
          <Typography as="h1" className={[classes["imgText"]]}>
            {event.title}
          </Typography>
          <Typography as="h2" className={[classes["imgText2"]]}>
            Usuarios asignados: {usersInEvent.length}
          </Typography>
          
          </div>
        </div>
        <div className={[classes["staffContainer"]]}>
            <div className={[classes["staffAddContainer"]]}>
        <Select
            value={selectedUser}
            onChange={(value) => setSelectedUser(value)}
            className="mb-4 bg-white Mobile-280:w-full"
                >
            {usersValid.map((user) => (
              <Option key={user.email} value={user.email}>
                {user.email}
              </Option>
            ))}
          </Select>
          <Button onClick={()=>handleAddUser(selectedUser)} className="w-36 bg-green-500 Mobile-280:w-fit"> Agregar</Button>  
          {alreadyInList && 
          //Mostrar popup
          <Dialog open={true} onClose={() => setAlreadyInList(false)} className='Mobile-390*844:w-96 Mobile-280:w-96'>
        <Dialog.Header className='font-text Mobile-390*844:text-base Mobile-280:text-sm'>
          Error
        </Dialog.Header>
        <Dialog.Body className='font-text Mobile-280:text-sm'>
          El usuario ya está en la lista de staff.
        </Dialog.Body>
        <Dialog.Footer className='font-text'>
          <Button onClick = {() => setAlreadyInList(false)}>
            Aceptar
          </Button>
        </Dialog.Footer>
      </Dialog>
          } 
            </div>
          <div className={classes["usersInEventContainer"]}>
            {usersInEvent.map((user) => (
                <div key={user.email} className={classes["userInEvent"]}>
                <IconButton 
                onClick={() => handleRemoveUser(user.email,user.code)}
                size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                  <TrashIcon className="h-4 w-4 text-yellowCapas" />
                </IconButton>
                <Avatar
                    src="data:image/jpeg;base64,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"
                    alt={user.name}
                    className="w-16 h-16 mx-auto
                    PC-1920*1080:w-16 PC-1920*1080:h-16
                    PC-1600*900:w-14 PC-1600*900:h-14
                    PC-1366*768:w-12 PC-1366*768:h-12
                    PC-1280*720:w-10 PC-1280*720:h-10
                    PC-800*600:w-10 PC-800*600:h-10
                    PC-640*480:w-8 PC-640*480:h-8
                    Mobile-390*844:w-10 Mobile-390*844:h-10
                    Mobile-280:w-12 Mobile-280:h-12
                    IpadAir:w-16 IpadAir:h-16
                    "
                />
                <div className={[classes["emailContainer"]]}>
                <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
    </div>
    </div>
    <div className={[classes["footerContainer"]]}>

    </div>
    </div>
  );
}