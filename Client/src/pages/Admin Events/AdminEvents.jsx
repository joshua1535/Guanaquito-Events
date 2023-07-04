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


//profile menu component
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
      </>
  );
};

export default AdminEvents;
