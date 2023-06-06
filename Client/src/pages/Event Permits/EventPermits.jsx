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


// profile menu component
const profileMenuItems = [
    {
      label: "Mis tickets",
    },
    {
      label: "Historial de eventos",
    },
    {
      label: "Transferir ticket",
    },
    {
      label: "Eventos",
    },
    {
      label: "Sign Out",
    },
  ];


   
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
   
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
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
                onClick={closeMenu}
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
  
  
   
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   
    const triggers = {
      onMouseEnter: () => setIsMenuOpen(true),
      onMouseLeave: () => setIsMenuOpen(false),
    };
    }
   
    
   
  // nav list component
  const navListItems = [
    {
      label: "Eventos",
    },
    {
      label: "Mis tickets",
    },
  ];
   
 function NavList() {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />
        {navListItems.map(({ label}, key) => (
          <Typography
            key={label}
            as="a"
            href="#"
            color="white"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {label}
            </MenuItem>
          </Typography>
        ))}
      </ul>
    );
  }

  
export default function EventsPermit() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);


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
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
      </header>
      <IconButton size="sm" color="blue-gray" variant="text" className="flex justify-start m-4">
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
                <button className={[classes["modifyEventButton"]]}>Modificar datos del evento</button>
            </div>
                <div className={[classes["buttonmodifyStaffContainer"]]}>
                <button className={[classes["modifyStaffButton"]]}>Asignar personal</button>
                </div>
                </div>
                <div className={[classes["buttonDisableContainer"]]}>
                <button className={[classes["disableButton"]]}>Deshabilitar evento</button>
                </div>
            </div>
            
            </div>
    </div>
    );
}