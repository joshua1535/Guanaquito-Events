import './AddTiers.module.css';
import classes from './AddTiers.module.css';
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
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';

  export default function AddTiers(){

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [showPopup, setShowPopup] = useState(false);
    const { eventCode } = useParams();
    const [tierName, setTierName] = useState('');
    const [tierPrice, setTierPrice] = useState('');
    const [tierCapacity, setTierCapacity] = useState('');
    const { user, token} = useUserContext();
    
  
  
      // Crea una función para manejar el cambio de cada campo
    const handleTierNameChange = (event) => {
      setTierName(event.target.value);
    };

    const handleTierPriceChange = (event) => {
      setTierPrice(event.target.value);
    };

    const handleTierCapacityChange = (event) => {
      setTierCapacity(event.target.value);
    };

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
                <h1 className={[classes["title1"]]}>Añade</h1>
                <h1 className={[classes["title2"]]}>localidades:</h1>
            </div>
            <div className={[classes["formContainer"]]}>
      <div className={[classes["form"]]}>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="eventName" className={[classes["titleInputs"]]}>
              Nombre de la localidad:
            </label>
            <Input
              id="tier"
              type="text"
              size="lg"
              color='white'
              placeholder="Ingrese el nombre de la localidad"
              value={tierName}
              onChange={handleTierNameChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="eventName" className={[classes["titleInputs"]]}>
              Precio
            </label>
            <Input
              id="price"
              type="number"
              size="lg"
              color='white'
              placeholder="Precio de la localidad"
              value={tierPrice}
              onChange={handleTierPriceChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="eventName" className={[classes["titleInputs"]]}>
              Capacidad
            </label>
            <Input
              id="price"
              type="number"
              size="lg"
              color='white'
              placeholder="Capacidad de la localidad"
              value={tierCapacity}
              onChange={handleTierCapacityChange}
            />
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
              Guardar
            </Button>
          </div>
        </form>
            </div>
            </div>
            {showPopup && (
                <div className={[classes["popupContainer"]]}>
      <Dialog open={true} onClose={handlePopupClose} className='Mobile-390*844:w-96 Mobile-280:w-96'>
        <Dialog.Header className='font-text Mobile-390*844:text-base Mobile-280:text-sm'>
          Confirmación
        </Dialog.Header>
        <Dialog.Body className='font-text Mobile-280:text-sm'>
          ¿Deseas seguir agregando más localidades?
        </Dialog.Body>
        <Dialog.Footer className='font-text'>
          <Button onClick={handleCancelClick} className='bg-black'>
            No
          </Button>
          <Button onClick={handlePopupClose} className='bg-yellowCapas ml-auto'>
            Sí
          </Button>
        </Dialog.Footer>
      </Dialog>
        </div>  
    )}
        </div>
        <Footer />
        </div>
        );
    }
