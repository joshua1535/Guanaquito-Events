import React, { useState, useEffect } from 'react';
import './MyEvents.module.css';
import { userService} from '../../Services/userService'
import logo from '../../assets/logo.png';
import classes from './MyEvents.module.css';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { useUserContext } from '../../Context/userContext';

import emptyBasket from '../../assets/imgs/bandeja-de-entrada-vacia.png';

const MyEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeButton, setActiveButton] = useState(1);
  const { user, token } = useUserContext(); 
  const [events, setEvents] = useState([]);
  const [ emptyEvents, setEmptyEvents] = useState(false);

  const [showDetails, setShowDetails] = useState(false);


  const navigate = useNavigate();
  const handleButtonClick = () => {
    setShowDetails(true);
  };

  const handleButtonClick2 = () => {
    setShowDetails(false);
  };
  

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleBuyButton = () => {
    navigate("/mytickets");
  };


  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect( () => {
    if(token) {
        userService.getHistory(token)
        .then( (data) => {
          setEvents(data);
          console.log("historial obtenido: ", data)
        }).catch( (error)=> {

          setEmptyEvents(true);
          if(error.response.status !== 404)
            throw error;
          
      })
    }
  }, [user, token]);

  return (
    <>
        <Header/>
      <div className="flex  flex-col sm:flex-col h-screen ">
        <div className='
        PC-1920*1080:text-5xl
        PC-1600*900:text-5xl
        PC-1366*768:text-4xl
        PC-1280*720:text-3xl 
        PC-800*600:text-3xl
        PC-640*480:text-2.5xl
        Mobile-390*844:text-3xl
        Mobile-280:text-2xl
         text-center text-white text-2.5xl'>
            <h1
            style={{ fontFamily: "Poppins", fontStyle:"italic" }}>
                Mis Eventos
            </h1>
        </div>

      <div className=" h-max  p-4">
        { emptyEvents ?  (
          <div className="text-white h-full lg:text-2xl mb items-center border-t-4 border-gray-500 rounded-t-2xl">
            <img className="mx-auto mt-16 w-32 h-32" src={emptyBasket} alt="GIF" />
            <p className="lg:my-4 flex items-center justify-center">Parece que aún no has asistido a ningun evento</p>
          </div>
        ) : (
          <div className={[classes["cardContainer"]]}>
            {events.map( e => (
              <div className=" space-y mt-10 bg-white p-4 rounded-lg m-2 sm_mt-10 sm:m-0" key={e.code}>
                <img 
                  src={e.image} alt="Imagen de evento"
                  className={[classes["cardImg"]]}/>
                <div className={[classes["textCardContainer"]]}>
                 <p className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                   PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                   break-words hover:break-all overflow-auto
                   ">
                  Fecha: </p>
                <p className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                  PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                   break-words hover:break-all overflow-auto
                   ">
                {e.date}
              </p>
              </div>
              
            <div className={[classes["textCardContainer"]]}>
            <Typography className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Hora:
              </Typography>
              <Typography className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {e.time}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Evento:
              </Typography>
              <Typography className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto">
                {e.title}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Ubicación:
              </Typography>
              <Typography className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {e.eventLocation?.name}
              </Typography>
            </div>           
              </div>
            )) }       
          </div>)}    
        </div>
      </div>      
    </>    
  );
};

export default MyEvents;
