import React, { useState, useEffect } from 'react';
import './AdminEvents.module.css';
import logo from '../../assets/logo.png';
import classes from './AdminEvents.module.css';
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
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';

const AdminEvents = () => {
  const categories = ["Todos", "Cine", "Conciertos", "Obras de teatro", "Deportes"];
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { user, token} = useUserContext();
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    if(token){
      eventService.getAllEvents(token)
          .then((data) => {
            setEvents(data.content);          
              console.log('Los eventos obtenidas:', events);
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      }
  }, [token]); 

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const navigate = useNavigate();

  const createEventClick = () => {
    navigate('/admin-event/createevent');
  }

  const editEventClick = (eventCode) => {
    navigate(`/admin-event/eventpermit/${eventCode}`);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    document.title = "Admin Events";
}, []);

  return (
    <>
    <div className="flex flex-col justify-between min-h-screen">
        <Header/>
      <div className="flex sm:justify-center flex-col sm:flex-row h-max">

      <div className=" h-max p-4 ">
            <div className="flex flex-col md:flex-row m-0 px-4  w-full md:w-full justify-center items-center">
              <div className='mb-4 md:mb-0'>
                  <button
                    onClick={createEventClick}
                    style={ { fontFamily: "Poppins" }}
                   className='w-44 h-10 px-8 mr-0 md:mr-4 rounded-lg text-white bg-Orange'>
                      Crear evento
                  </button>
              </div>

              <div className='w-full'>
                  <input 
                      placeholder='Buscar eventos Ej. Super Mario Bros' 
                      className='w-full md:w-ful  rounded-md p-2 bg-white'
                  />
              </div>
          </div>
        
          <div className="flex 
          PC-1920*1080:space-x-10
          PC-1920*1080:pt-4
          PC-1600*900:space-x-7
           p-0 flex-wrap sm:space-x-4 justify-center">
            {events.map((event, index) => (
              <div className=" p-4 rounded-lg m-2 sm:m-0" key={index}>
                <img 
                src={event.image} alt="Imagen de evento"
                className="
                  PC-1920*1080:w-56 PC-1920*1080:h-80
                  PC-1600*900:w-48 PC-1600*900:h-72
                 w-40 h-56 object-cover mb-2 rounded"/>
                  <p style={ { fontFamily: "PoppinsLight" }} className=" text-white font-semibold text-xl">{event.title}</p>
                  <p style={ { fontFamily: "PoppinsLight" }} className="text-Orange font-semibold text-lg">{event.date}</p>
                <div className="flex justify-center">
                <button 
                onClick={() =>editEventClick(event.code)}
                className="border border-Orange  bg-transparent text-Orange px-14 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                style={ { fontFamily: "PoppinsLight" }}
                >Editar
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
      </>
  );
};

export default AdminEvents;
