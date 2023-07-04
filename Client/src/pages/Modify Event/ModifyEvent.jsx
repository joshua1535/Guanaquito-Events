import './ModifyEvent.module.css';
import classes from './ModifyEvent.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
    Card,
    IconButton,
    Chip,
    Input,
    Select,
    Option,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';


  const categoryOptions = [
    "Cine",
    "Teatro",
    "Deportes",
    "Música",
    // Añade más categorías según tus necesidades
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


export default function ModifyEvent() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [duration, setDuration] = useState("");
    const [participant, setParticipant] = useState("");
    const [participants, setParticipants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [modifyTier, setModifyTier] = useState(false);
    const [AddTiers, setAddTiers] = useState(false);
    const { eventCode } = useParams();
    const { user,token } = useUserContext();
    const [event, setEvent] = useState([]);
    const [image, setImage] = useState("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60");
    const [category, setCategory] = useState("");
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState();
    const [time, setTime] = useState();


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


    const [sponsor, setSponsor] = useState(event.sponsors);
    const [sponsors, setSponsors] = useState([]);


    const navigate = useNavigate();

    const [locations, setLocations] = useState([
      { name: "Localidad 1", price: 100 },
      { name: "Localidad 2", price: 200 },
      { name: "Localidad 3", price: 300 },
      { name: "Localidad 4", price: 100 },
      { name: "Localidad 5", price: 200 },
      { name: "Localidad 6", price: 300 },
      { name: "Localidad 7", price: 100 },
      { name: "Localidad 8", price: 200 },
      { name: "Localidad 9", price: 300 },
    ]);

    const handlesaveClick2 = () => {
      eventService.updateEvent({
          code: eventCode,
          title: eventName,
          involvedPeople: participants.join(", "),
          image: image,  // Reemplaza esto con el valor del campo "Foto del evento"
          date: date,  // Reemplaza esto con el valor del campo "Fecha"
          time: time,  // Reemplaza esto con el valor del campo "Hora"
          duration: parseInt(duration),
          sponsors: sponsors.join(", "),
          categoryCode: category// Reemplaza esto con el valor del campo "Categoría"
      }, token)
          .then(response => {
              console.log('Evento modificado con éxito:', response);
              navigate(`/admin-event/eventpermit/${eventCode}`);

          })
          .catch(error => {
              console.error('Hubo un error al crear el evento:', error);
              // aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
          });
  };


    const handlesaveClick = () => {
      // Guardar los datos en la base de datos
      console.log("Datos guardados");
      navigate('/admin-event');
    };

    const handlecancelClick = () => {
      // Regresar a la página anterior
      console.log("Datos no guardados");
      navigate(-1);
    };

    const handleupdateTierClick = () => {
      // Guardar los datos en la base de datos
      console.log("Datos guardados");
      window.location.reload();
     
    };

    const handleAddTierClick = () => {
      navigate('/admin-event/modifyevent/addtier');
    };

    const handleButtonClick = () => {
      setModifyTier(true);
    };

    const handleButtonClick2 = () => {
      setModifyTier(false);
    };

    const handleAddSponsor = () => {
        // Agregar el sponsor al array de sponsors
        setSponsors((prevSponsors) => [...prevSponsors, sponsor]);
        // Limpiar el input de sponsors
        setSponsor("");
        };

    const handleSponsorChange = (e) => {
        setSponsor(e.target.value);
        };

    const handleSponsorInputChange = (e) => {
        setSponsor(e.target.value);
        };

    const handleDeleteSponsor = (index) => {
        // Eliminar el sponsor del array de sponsors
        setSponsors((prevSponsors) =>
        prevSponsors.filter((_, i) => i !== index)
        );
        };
    
  
    const handleAddParticipant = () => {
      // Agregar el participante al array de participantes
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
      // Limpiar el input de participantes
      setParticipant("");
    };
  
    const handleParticipantChange = (e) => {
      setParticipant(e.target.value);
    };
  
    const handleParticipantInputChange = (e) => {
      setParticipant(e.target.value);
    };
  
    const handleDeleteParticipant = (index) => {
      // Eliminar el participante del array de participantes
      setParticipants((prevParticipants) =>
        prevParticipants.filter((_, i) => i !== index)
      );
    };

    const handleDurationChange = (e) => {
      // Verificar que el valor ingresado sea un número
      const value = e.target.value.replace(/\D/, "");
      setDuration(value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        };

    const handleCategoryInputChange = (e) => {
        setSelectedCategory(e.target.value);
        };
    
    const handleUpdateLocation = (index, key, value) => {
      // Actualizar el valor de la propiedad del objeto
      setLocations((prevLocations) =>
        prevLocations.map((location, i) => {
          if (i === index) {
            return {
              ...location,
              [key]: value,
            };
          }
          return location;
        })
      );
    };


    const handleAddLocation = () => {
      // Agregar una nueva localidad al array de localidades
      setLocations((prevLocations) => [
        ...prevLocations,
        { name: "", price: "" },
      ]);
    };


    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "Create Event";
        }, []);

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
      <div className={[classes["buttonchangeView"]]}>
      <button
      onClick={handleButtonClick2} 
      className={`PC-1920*1080:w-full PC-1920*1080:h-12 PC-1920*1080:text-2xl  PC-1920*1080:py-1 rounded 
      PC-1600*900:w-full PC-1600*900:h-12 PC-1600*900:text-2xl  PC-1600*900:py-1
      PC-1366*768:w-full PC-1366*768:h-12 PC-1366*768:text-xl  PC-1366*768:py-1
      PC-1280*720:w-full PC-1280*720:h-12 PC-1280*720:text-xl  PC-1280*720:py-1
      PC-1024*768:w-full PC-1024*768:h-12 PC-1024*768:text-lg  PC-1024*768:py-1
      PC-800*600:w-full PC-800*600:h-12 PC-800*600:text-base  PC-800*600:py-1
      PC-640*480:w-full PC-640*480:h-12 PC-640*480:text-base  PC-640*480:py-1
      Mobile-390*844:w-full Mobile-390*844:h-12 Mobile-390*844:text-sm  Mobile-390*844:py-1
      Mobile-280:w-full Mobile-280:h-12 Mobile-280:text-sm  Mobile-280:py-1
      ${modifyTier === false ? 'bg-Orange text-blue-900' : 'bg-dark-blue text-white hover:bg-orange-600'}`}
      style={{ fontFamily: "Poppins" }}
      >MODIFICAR EVENTO</button>
      <button 
      onClick={handleButtonClick}
      className={`PC-1920*1080:w-full PC-1920*1080:h-12 PC-1920*1080:text-2xl  PC-1920*1080:py-1 rounded
      PC-1600*900:w-full PC-1600*900:h-12 PC-1600*900:text-2xl  PC-1600*900:py-1
      PC-1366*768:w-full PC-1366*768:h-12 PC-1366*768:text-xl  PC-1366*768:py-1
      PC-1280*720:w-full PC-1280*720:h-12 PC-1280*720:text-xl  PC-1280*720:py-1
      PC-1024*768:w-full PC-1024*768:h-12 PC-1024*768:text-lg  PC-1024*768:py-1
      PC-800*600:w-full PC-800*600:h-12 PC-800*600:text-base  PC-800*600:py-1
      PC-640*480:w-full PC-640*480:h-12 PC-640*480:text-base  PC-640*480:py-1
      Mobile-390*844:w-full Mobile-390*844:h-12 Mobile-390*844:text-sm  Mobile-390*844:py-1
      Mobile-280:w-full Mobile-280:h-12 Mobile-280:text-sm  Mobile-280:py-1
      ${modifyTier === true ? 'bg-Orange text-blue-900 ' : 'bg-dark-blue text-white hover:bg-orange-600'}
        text-blue-900 `}
      style={{ fontFamily: "Poppins" }}
        >MODIFICAR LOCALIDADES</button>
      </div>
    {modifyTier ? (
      <div className={classes["modifytierContainer"]}>
        <div className={classes["buttonContainer"]}>
       <Button
         className="bg-yellowCapas Mobile-280:text-xs"
         onClick={handleAddTierClick}
       >
         Agregar localidad
       </Button>
     </div>
     <div className={classes["tierContainer"]}>
      <div className={classes["formTierContainer"]}>
          {locations.map((location, index) => (
            <div key={index} className={classes["formTier"]}>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor={`locationName${index}`}
                    className={classes["titleInputs"]}
                  >
                    Nombre de la localidad:
                  </label>
                  <Input
                    id={`locationName${index}`}
                    type="text"
                    color="white"
                    placeholder="Ingrese el nombre de la localidad"
                    defaultValue={location.name}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor={`locationPrice${index}`}
                    className={classes["titleInputs"]}
                  >
                    Precio
                  </label>
                  <Input
                    id={`locationPrice${index}`}
                    type="number"
                    color="white"
                    placeholder="Precio de la localidad"
                    defaultValue={location.price}
                  />
                </div>
                <div className="flex space-x-4 justify-end Mobile-280:justify-center">
                  <Button className="bg-yellowCapas Mobile-280:text-ButtonCarouselMobile-390*844"
                  onClick={handleupdateTierClick}
                  >
                    Actualizar
                  </Button>
                </div>
              </form>
            </div>
          ))}
        </div>
        </div>   
        </div>
    ) : (
      <div className={[classes["bodyContainer"]]}>
            <div className={[classes["formContainer"]]}>
      <div className={[classes["form"]]}>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="eventName" className={[classes["titleInputs"]]}>
              Nombre del evento
            </label>
            <Input
              id="eventName"
              type="text"
              color='white'
              value={eventName}
              onChange={event => setEventName(event.target.value)}
              placeholder="Ingrese el nombre del evento"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="participant" className={[classes["titleInputs"]]}>
              Participantes
            </label>
            <div className="flex space-x-2 Mobile-280:grid Mobile-280:grid-rows-2">
              <Input
                id="participant"
                type="text"
                color='white'
                value={participant}
                onChange={handleParticipantInputChange}
                placeholder="Ingrese el nombre del participante"
              />
              <Button className='m-auto Mobile-280:mt-2 Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844 Mobile-390*844:w-28 
              Mobile-390*844:text-ButtonCarouselMobile-390*844 '
                color="blue"
                onClick={handleAddParticipant}
              >
                Agregar
              </Button>
            </div>
            {participants.length > 0 && (
              <div className="mt-2">
                <label htmlFor="participants" className={[classes["titleInputs"]]}>
                  Lista de participantes
                </label>
                <Input
                  id="participants"
                  type="text"
                  value={participants.join(", ")}
                  disabled
                />
                <ul className="mt-2 space-y-1">
                  {participants.map((participant, index) => (
                    <li key={index} className="flex items-center">
                      <span className='text-white'> - {participant}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteParticipant(index)}
                        className="ml-2 text-red-600"
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={[classes["container3Inputs"]]}>
            <div>
              <label htmlFor="category" className={[classes["titleInputs"]]}>
                Categoría
                
              </label>
                <Select
                 onChange={value => setCategory(value)}
                className='text-white'>
                    <Option value="CI">Cine</Option>
                    <Option value="MU">Musica</Option>
                    <Option value="OB">Obras de teatro</Option>
                    <Option value="DE">Deportes</Option>
                </Select>
            </div>
            <div>
              <label htmlFor="time" className={[classes["titleInputs"]]}>
                Hora
              </label>
              <Input
                id="time"
                type="time"
                color='white'
                value={time}
                onChange={event => setTime(event.target.value)}
                placeholder="Seleccione la hora"
              />
            </div>
            <div>
            <label htmlFor="duration" className={[classes["titleInputs"]]}>
              Duración (segundos)
            </label>
            <Input
              id="duration"
              type="text"
              color='white'
              value={duration}
              onChange={handleDurationChange}
              placeholder="Ingrese la duración"
            />
          </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="sponsor" className={[classes["titleInputs"]]}>
              Patrocinadores
            </label>
            <div className="flex space-x-2 Mobile-280:grid Mobile-280:grid-rows-2" >
              <Input
                id="sponsor"
                type="text"
                color='white'
                value={sponsor}
                onChange={handleSponsorInputChange}
                placeholder="Ingrese el nombre del patrocinador"
              />
              <Button className='m-auto Mobile-280:mt-2 Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844 Mobile-390*844:w-28
              Mobile-390*844:text-ButtonCarouselMobile-390*844'
                color="blue"
                onClick={handleAddSponsor}
              >
                Agregar
              </Button>
            </div>
            {sponsors.length > 0 && (
              <div className="mt-2">
                <label htmlFor="sponsors" className={[classes["titleInputs"]]}>
                  Lista de patrocinadores
                </label>
                <Input
                  id="sponsors"
                  type="text"
                  color='white'
                  value={sponsors.join(", ")}
                  disabled
                />
                <ul className="mt-2 space-y-1">
                  {sponsors.map((sponsor, index) => (
                    <li key={index} className="flex items-center">
                      <span className='text-white'> -{sponsor}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSponsor(index)}
                        className="ml-2 text-red-600"
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className={[classes["titleInputs"]]}>
              Fecha
            </label>
            <Input
              id="date"
              type="date"
              color='white'
              value={date}
              onChange={event => setDate(event.target.value)}
              placeholder="Seleccione la fecha"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="eventPhoto" className={[classes["titleInputs"]]}>
              Foto del evento
            </label>
            <Input
              id="eventPhoto"
              type="text"
              color='white'
              placeholder="Seleccione una foto"
              onChange={event => setImage(event.target.value)}
            />
          </div>
          <div className="flex space-x-4 justify-end Mobile-280:justify-center ">
            <Button 
            onClick={handlecancelClick}
            className='bg-black Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Cancelar
            </Button>
            <Button 
            onClick={handlesaveClick2}
            className='bg-yellowCapas Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div> 
    )}
      <footer className="  bg-bluefooter text-white mt-5 py-4 px-6 text-center">

        <div className='relative mx-auto flex mb-5 items-center text-white'>        
          <img src={logo} alt="logo" className="h-12 w-12 mr-2 mb-2" />
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
          >
            Guanaco Business
          </Typography>
        </div>
        <p className='h-max w-max text-sm text-gray-500'>
        © 2023 Copyright
        </p>
        <div className='flex justify-start content-start'>
          </div>
        <div className='flex justify-end content-end'>
            <FaFacebook
            className='mr-2 w-8 h-8'

            />

            <FaTwitter
            className='mr-2 ml-2 w-8 h-8'
            />
            <FaInstagram 
            className='mr-2 ml-2 w-8 h-8'
            />

        </div>

    </footer>
    </div>   
    )
}



