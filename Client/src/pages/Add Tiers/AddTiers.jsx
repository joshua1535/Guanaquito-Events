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
    const [addTier, setAddTier] = useState(false);
    const [tierCapacity, setTierCapacity] = useState('');
    const { user, token} = useUserContext();

    const tiers = [
      {
          eventName: "Concierto de Rock",
          tierName: "VIP",
          price: 150,
          capacity: 50
      },
      {
          eventName: "Concierto de Rock",
          tierName: "General",
          price: 75,
          capacity: 200
      },
      {
          eventName: "Festival de Cine",
          tierName: "Premium",
          price: 100,
          capacity: 30
      },
      {
          eventName: "Festival de Cine",
          tierName: "Estándar",
          price: 50,
          capacity: 100
      },
      {
          eventName: "Obra de Teatro",
          tierName: "Palco",
          price: 120,
          capacity: 20
      },
      {
          eventName: "Obra de Teatro",
          tierName: "Platea",
          price: 60,
          capacity: 150
      },
      {
          eventName: "Torneo E-Sports",
          tierName: "Asiento chuco",
          price: 200,
          capacity: 40
      },
      {
          eventName: "Smashito",
          tierName: "Jugador",
          price: 250,
          capacity: 20
      }
  ];
  
    
  
  
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

    const handleButtonClick = () => {
      setAddTier(true);
    };

    const handleButtonClick2 = () => {
      setAddTier(false);
    };

  const handleAddTier = (name,price,capacity) => {  
    setTierName(name);
    setTierPrice(price);
    setTierCapacity(capacity);

    console.log("NOMBRE:" + tierName + "CAPACIDAD:" + tierCapacity + "PRECIO" + tierPrice);
    setAddTier(false);

  };

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
          <div className={[classes["buttonchangeView"]]}>
            <button
            onClick={handleButtonClick2} 
            className={`PC-1920*1080:w-full PC-1920*1080:h-16 PC-1920*1080:text-2xl  PC-1920*1080:py-1 rounded 
            PC-1600*900:w-full PC-1600*900:h-12 PC-1600*900:text-2xl  PC-1600*900:py-1
            PC-1366*768:w-full PC-1366*768:h-14 PC-1366*768:text-xl  PC-1366*768:py-1
            PC-1280*720:w-full PC-1280*720:h-12 PC-1280*720:text-xl  PC-1280*720:py-1
            PC-1024*768:w-full PC-1024*768:h-12 PC-1024*768:text-lg  PC-1024*768:py-1
            PC-800*600:w-full PC-800*600:h-12 PC-800*600:text-base  PC-800*600:py-1
            PC-640*480:w-full PC-640*480:h-12 PC-640*480:text-base  PC-640*480:py-1
            Mobile-390*844:w-full Mobile-390*844:h-12 Mobile-390*844:text-sm  Mobile-390*844:py-1
            Mobile-280:w-full Mobile-280:h-12 Mobile-280:text-sm  Mobile-280:py-1
            ${addTier === false ? 'bg-Orange text-blue-900' : 'bg-dark-blue text-white hover:bg-orange-600'}`}
            style={{ fontFamily: "Poppins" }}
            >AÑADIR LOCALIDAD</button>
            <button 
            onClick={handleButtonClick}
            className={`PC-1920*1080:w-full PC-1920*1080:h-16 PC-1920*1080:text-2xl  PC-1920*1080:py-1 rounded
            PC-1600*900:w-full PC-1600*900:h-12 PC-1600*900:text-2xl  PC-1600*900:py-1
            PC-1366*768:w-full PC-1366*768:h-12 PC-1366*768:text-xl  PC-1366*768:py-1
            PC-1280*720:w-full PC-1280*720:h-12 PC-1280*720:text-xl  PC-1280*720:py-1
            PC-1024*768:w-full PC-1024*768:h-12 PC-1024*768:text-lg  PC-1024*768:py-1
            PC-800*600:w-full PC-800*600:h-12 PC-800*600:text-base  PC-800*600:py-1
            PC-640*480:w-full PC-640*480:h-12 PC-640*480:text-base  PC-640*480:py-1
            Mobile-390*844:w-full Mobile-390*844:h-12 Mobile-390*844:text-sm  Mobile-390*844:py-1
            Mobile-280:w-full Mobile-280:h-12 Mobile-280:text-sm  Mobile-280:py-1
            ${addTier === true ? 'bg-Orange text-blue-900 ' : 'bg-dark-blue text-white hover:bg-orange-600'}
              text-blue-900 `}
            style={{ fontFamily: "Poppins" }}
              >RECOMENDACIONES</button>
          </div>   
      <div className={[classes["formContainer"]]}>
      <div className={[classes["form"]]}>
        {addTier ? 
            (            
            <div className={classes["tierContainer"]}>
              <div className={classes["formTierContainer"]}>
                {tiers.map((location,index) => (
                  <div key={index} className={classes["formTier"]}>
              
                    <form className="space-y-6 w-auto">                  
                      <h2 className={[classes["title"]]}> {location.eventName} </h2>
                      <p className={[classes["desc"]]}>Localidad: <span className="text-white font"> {location.tierName}</span></p>
                      <p className={[classes["desc"]]}>Precio: <span className="text-white font mb-5">{location.price}</span></p>
                      <p className={[classes["desc"]]}>Capacidad: <span className="text-white" >{location.capacity}</span></p>                      
                      <div className="flex space-x-4 justify-end Mobile-280:justify-center">
                        <Button className="bg-green-400 Mobile-280:text-ButtonCarouselMobile-390*844"
                        onClick={()=>handleAddTier(location.tierName,location.price,location.capacity)}
                        >
                          Añadir tier
                        </Button>
                      </div>
                    </form>
                </div>
                ))}              
                {/*
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
                            name="name" 
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
                  ))}*/}
                </div>
                </div>  

            ) : 
            (             
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
            </form>
            
            ) }        
            </div>
            </div>
          
        </div>
        <Footer />
        </div>
        );
    }
