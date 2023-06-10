import './EventPermits.module.css';
import classes from './EventPermits.module.css';
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
    ArrowLeftIcon
  } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';



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

  
export default function EventsPermit() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    const navigate = useNavigate();

    const handleModifyEventClick = () => {
        navigate('/admin-event/modifyevent');
    }

    const handleModifyStaffClick = () => {
        navigate('/admin-event/modifystaff');
    }

    const handleDisableEventClick = () => {
        navigate('/admin-event/');
    }

    const handleBackClick = () => {
      navigate(-1);
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
      <IconButton 
      onClick = {handleBackClick}
      size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
                <ArrowLeftIcon className="h-6 w-6 text-white" />
            </IconButton>
        <div className={[classes["bodyContainer"]]}>
            <div className={[classes["imgContainer"]]}>
            <img src="https://www.coldplay.com/wp/wp-content/uploads/2023/05/cannot-wait.jpg"
             alt="eventImg" className={[classes["imgEvent"]]}/>
            </div>
            <div className={[classes["infoEventContainer"]]}>
            <div className={[classes["textContainer"]]}>
                <div className={[classes["titleContainer"]]}>
                <h1 className={[classes["eventTitle"]]}> ColdPlay Tour </h1>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Fecha:</p>
                <p className={[classes["title2"]]}>6 de abril</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Hora:</p>
                <p className={[classes["title2"]]}>20:15</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Participantes:</p>
                <p className={[classes["title2"]]}>Mi primo</p>
                </div>
                <div className={[classes["titleContainer"]]}>
                <p className={[classes["title1"]]}>Patrocinadores:</p>
                <p className={[classes["title2"]]}>Nayib Bukele</p>
                </div>
                </div>
                <div className={[classes["buttonContainer"]]}>
                <div className={[classes["buttonmodifyContainer"]]}>
                <button 
                onClick={handleModifyEventClick}
                className={[classes["modifyEventButton"]]}>Modificar datos del evento</button>
            </div>
                <div className={[classes["buttonmodifyStaffContainer"]]}>
                <button 
                onClick={handleModifyStaffClick}
                className={[classes["modifyStaffButton"]]}>Asignar personal</button>
                </div>
                </div>
                <div className={[classes["buttonDisableContainer"]]}>
                <button 
                onClick={handleDisableEventClick}
                className={[classes["disableButton"]]}>Deshabilitar evento</button>
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
    );
}