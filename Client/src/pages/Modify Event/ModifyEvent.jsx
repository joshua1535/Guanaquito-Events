import './ModifyEvent.module.css';
import classes from './ModifyEvent.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.jpg';
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
import { tierService } from '../../Services/tierService';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';


  const categoryOptions = [
    "Cine",
    "Teatro",
    "Deportes",
    "Música",
    // Añade más categorías según tus necesidades
  ];

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

    //para eventos
    const { eventCode } = useParams();
    const { user,token } = useUserContext();
    const [event, setEvent] = useState([]);
    const [tier, setTier] = useState([]);
    const [image, setImage] = useState("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnRvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60");
    const [category, setCategory] = useState();
    const [eventName, setEventName] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    //para tiers
    const [tierName, setTierName] = useState();
    const [tierPrice, setTierPrice] = useState();
    const [tierCapacity, setTierCapacity] = useState();

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
        tierService.getTiersbyEvent(eventCode,token)
            .then((data) => {
              setTier(data.tiers);          
                console.log('tiers obtenidos:', tier.tiers);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener los tiers:', error);
            });
        }
    }, [token]); 

    const [sponsor, setSponsor] = useState();
    const [sponsors, setSponsors] = useState([null]);


    const navigate = useNavigate();

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

    const [locations, setLocations] = useState([tier]); // Ahora, locations es tu estado principal.
    console.log("hola"+locations);

    const handleInputChange = (code, event) => {
        const values = [...tier];
        const locationToUpdate = values.find(location => location.code === code);
        if (locationToUpdate) {
            locationToUpdate[event.target.name] = event.target.value;

            setLocations(values);
        } else {
            console.error(`Location with code ${code} not found`);
            console.log("hola"+tier);
        }
    };

    const handleupdateTierClick = (tierCode) => {
      const tierToUpdate = tier.find(location => location.code === tierCode);

      tierService.updateTier({
        code: tierCode,
        name: tierToUpdate.name,
        price: tierToUpdate.price,
        capacity: tierToUpdate.capacity,
    }, token)
        .then(response => {
            console.log('Evento modificado con éxito:', response);

        })
        .catch(error => {
            console.error('Hubo un error al crear el evento:', error);
            // aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
        });
     
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
        <Header/>
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
          {tier.map((location,index) => (
            <div key={index}    className={classes["formTier"]}>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label
                    className={classes["titleInputs"]}
                  >
                    Nombre de la localidad:
                  </label>
                  <Input
                    type="text"
                    name="name"  // Asegúrate de darle un nombre al input, que corresponde a la propiedad que quieres cambiar
                    color="white"
                    onChange={(event) => handleInputChange(location.code, event)}
                    placeholder={location.name}
                />
                </div>
                <div className="space-y-2">
                  <label
                    className={classes["titleInputs"]}
                  >
                    Precio
                  </label>
                  <Input
                    type="number"
                    color="white"
                    placeholder="Precio de la localidad"
                    name="price"
                    onChange={(event) => handleInputChange(location.code, event)}
                    defaultValue={location.price}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className={classes["titleInputs"]}
                  >
                    Capacidad
                  </label>
                  <Input
                    type="number"
                    color="white"
                    placeholder="Capacidad de la localidad"
                    name="capacity"
                    onChange={(event) => handleInputChange(location.code, event)}
                    defaultValue={location.capacity}
                  />
                </div>
                <div className="flex space-x-4 justify-end Mobile-280:justify-center">
                  <Button className="bg-yellowCapas Mobile-280:text-ButtonCarouselMobile-390*844"
                  onClick={()=>handleupdateTierClick(location.code)}
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
      <Footer />
    </div>   
    )
}



