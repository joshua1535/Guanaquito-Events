import './AddLocation.module.css';
import classes from './AddLocation.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.jpg';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
    Button,
    Input,
    Select,
    Option,
    Dialog,
    Collapse,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../Context/userContext';
import { tierService } from '../../Services/tierService';
import { eventService } from '../../Services/eventService';
import MapComponent from '../../Components/MapComponent';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';

  export default function AddLocation(){

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [showPopup, setShowPopup] = useState(false);
    const { eventCode } = useParams();
    const [event, setEvent] = useState([]);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [tierName, setTierName] = useState('');
    const [tierPrice, setTierPrice] = useState('');
    const [tierCapacity, setTierCapacity] = useState('');
    const { user, token} = useUserContext();

    useEffect(() => {
        if(token){
          eventService.getEventById(eventCode,token)
              .then((data) => {
                setEvent(data);  
                setDate(data.date);                
                setTime(data.time);
                  console.log('evento obtenido:', event);
              })
              .catch((error) => {
                  console.error('Hubo un error al obtener las eventos:', error);
              });
          }
    }, [token]); 
    
  
  
    const navigate = useNavigate();

    const handleSaveClick = () => {
        const tierInfo = {
          name: tierName,
          price: parseFloat(tierPrice),
          capacity: parseInt(tierCapacity),
          eventCode: eventCode
        };
        
        console.log(tierInfo);

        tierService.saveTier(tierInfo, token)
          .then(response => {
            console.log('Tier creado con éxito:', response);
            setShowPopup(true);
            // Navega a otra ruta o haz algo más después de guardar el tier
          })
          .catch(error => {
            console.error('Hubo un error al crear el tier:', error);
            // Muestra un mensaje de error o maneja el error de otra manera
          });
      
      };
    
      const handlePopupClose = () => {
        setShowPopup(false);
      };

      const handleCancelClick = () => {
        navigate('/admin-event/');
      };

    

    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "Add Tiers";
        }, []);
    
        return (
          <div className={[classes["generalContainer"]]}>
          <Header/>
        <div className={[classes["bodyContainer"]]}>
        <div className={[classes["titleContainer"]]}>
                <h1 className={[classes["title1"]]}> Elige la</h1> 
                <h1 className={[classes["title2"]]}> ubicación</h1>

            </div>
            <div className={[classes["formContainer"]]}>
      <div className={[classes["form"]]}>
        <form className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start p-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
                <MapComponent />
            </div>
            <div className="w-full md:w-1/2">
                <h2 className={[classes["title"]]}>ESTADIO LAS DELICIAS</h2>
                <p className={[classes["desc"]]}>Dirección: <span className="text-white font">Final 4a Calle Pte. MPC2+M6 Santa Tecla</span></p>
                <p className={[classes["desc"]]}>Fecha y hora: <span className="text-white font mb-5">{date} {time}</span></p>
                <p className={[classes["desc"]]}>Disponibilidad del sitio: <span className="text-green-400">Desocupado</span></p>
            </div>
        </div>       
          <div className="flex space-x-4 justify-end Mobile-280:justify-center ">
            <Button 
            onClick={handleCancelClick}
            className='bg-black Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Cancelar
            </Button>
            <Button className='bg-yellowCapas Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'
            onClick={handleSaveClick}
            >
              Continuar
            </Button>
          </div>
        </form>
            </div>
            </div>            
        </div>
        <Footer />
        </div>
        );
    }
