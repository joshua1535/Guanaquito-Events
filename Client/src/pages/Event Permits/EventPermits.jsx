import './EventPermits.module.css';
import classes from './EventPermits.module.css';
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
    ArrowLeftIcon
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';
  
export default function EventsPermit() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { eventCode } = useParams();
    const { user,token } = useUserContext();
    const [event, setEvent] = useState([]);

    const editEventClick = (eventCode) => {
      navigate(`/admin-event/modifyevent/${eventCode}`);
    }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if(token){
        setLoading(true);
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

    const [eventIsActive, setEventIsActive] = useState(event.active); 
    
    const editstatusEventClick = () => {
    eventService.changeEventStatus(eventCode, token)
    .then(response => {
        console.log('El estado del evento ha cambiado con éxito:', response);
        event.active = !event.active;
        setEventIsActive(!eventIsActive);
    })
    .catch(error => {
        console.error('Hubo un error al cambiar el estado del evento:', error);
    });
    };

    let buttonText = event.active ?  "Deshabilitar evento":"Habilitar evento" ;

    const navigate = useNavigate();

    const handleModifyEventClick = () => {
        navigate('/admin-event/modifyevent');
    }

    const handleModifyStaffClick = (eventCode) => {
        navigate(`/admin-event/modifystaff/${eventCode}`);
    }

    const handleDisableEventClick = () => {
        navigate('/admin-event/');
    }

    const handleBackClick = () => {
      navigate('/admin-event/');
  }

    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "Event Permits";
        }, []);

    return (
      <div className={[classes["generalContainer"]]}>
      <Header/>
      <IconButton 
      onClick = {handleBackClick}
      size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                <ArrowLeftIcon className="h-6 w-6 text-white" />
            </IconButton>
            <div className="flex flex-col min-h-screen"> 
        <div className={[classes["bodyContainer"]]}>
            <div className={[classes["imgContainer"]]}>
            <img src={event.image}
             alt="eventImg" className={[classes["imgEvent"]]}/>
            </div>
            
            <div className={[classes["infoEventContainer"]]}>           
            <div className={[classes["textContainer"]]}>               
                <div className={[classes["titleContainer"]]}>
                <h1 className={[classes["eventTitle"]]}> {event.title} </h1>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Fecha:</p>
                <p className={[classes["title2"]]}>{event.date}</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Hora:</p>
                <p className={[classes["title2"]]}>{event.time}</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Participantes:</p>
                <p className={[classes["title2"]]}>{event.involvedPeople}</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Patrocinadores:</p>
                <p className={[classes["title2"]]}>{event.sponsors}</p>
                </div>
                </div>
                <div className={[classes["buttonContainer"]]}>
                <div className={[classes["buttonmodifyContainer"]]}>
                <button 
                onClick={() =>editEventClick(event.code)}
                className={[classes["modifyEventButton"]]}>Modificar datos del evento</button>
            </div>
                <div className={[classes["buttonmodifyStaffContainer"]]}>
                <button 
                onClick={() =>handleModifyStaffClick(event.code)}
                className={[classes["modifyStaffButton"]]}>Asignar personal</button>
                </div>
                </div>
                <div className={[classes["buttonDisableContainer"]]}>
                <button 
                    onClick={editstatusEventClick}
                    style={{ backgroundColor: event.active ? 'red' : 'green' }}
                    className={[classes["buttonDisableContainer"]]}
                    >
                    {buttonText}
                </button>
                </div>
            </div>
            
            </div>
        </div>
        <Footer/>
    </div>
    );
}