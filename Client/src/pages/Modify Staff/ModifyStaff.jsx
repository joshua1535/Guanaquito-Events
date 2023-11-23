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
import imgtemplate from "../../assets/loginimg.jpg";
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
import Header from "../../Components/Header/Header";


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
    const [size, setSize] = useState(500); 

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
      <Header/>
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
                    src={user.profilePicture}
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