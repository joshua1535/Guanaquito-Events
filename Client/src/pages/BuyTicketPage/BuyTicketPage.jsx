import React, { useState, useEffect } from 'react';
import './BuyTicketPage.module.css';
import logo from '../../assets/logo.png';
import classes from './BuyTicketPage.module.css';
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
                  variant="lg"
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
            variant="lg"
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
  

  const BuyTicket = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [activeButton, setActiveButton] = useState(1);
  
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);

    return (
        <>
        <header className={[classes["headerContainer"]]}>
        <Navbar  className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
        <div className={[classes["headerTypography"]]}>
        <img src={logo} alt="logo" className="hidden sm:inline-block h-12 w-12 mx-4" />
        <Typography
          as="a"
          href="#"
          className="mr-4 text-xl hidden sm:inline-block  cursor-pointer py-1.5 font-medium text-white"
          style={{ fontFamily: "PoppinsLight" } }
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
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>

      </Navbar>
    </header>
        <div className="flex flex-col items-center justify-center mt-6">
            <div className="flex w-3/4 h-3/4 shadow-md overflow-hidden">
                <img 
                    className="w-80 h-full object-cover" 
                    src="https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png" 
                    alt="Event"
                />
                <div className="flex-grow ml-4 bg-cover "
                    style={{ backgroundImage: 'url(https://i.postimg.cc/d3MywV5s/imagen-2023-06-05-090157807.png)' }} 
                    >
                    {/* Zona superior con dos columnas de botones */}

                    
                    <div className=" flex columns-2 h-max w-full me-0 ">
                        <button
                        onClick={() => setActiveButton(1)} 
                        className={` buttonBuy w-full h-12 text-2xl  py-1  rounded ${activeButton === 1 ? 'bg-Orange text-blue-900' : 'bg-dark-blue text-white hover:bg-orange-600'}`}
                        style={{ fontFamily: "Poppins" }}
                        >COMPRAR</button>
                        <button 
                        onClick={() => setActiveButton(2)}
                        className={`w-full h-12 text-2xl  py-1   rounded ${activeButton === 2 ? 'bg-Orange text-blue-900 ' : 'bg-dark-blue text-white hover:bg-orange-600'}
                          text-blue-900 `}
                        style={{ fontFamily: "Poppins" }}
                          >DETALLES DEL EVENTO</button>
                    </div>

                    <div className="flex items-center w-max text-Orange ml-14 mt-7" style={{ fontFamily: "Poppins" }}>
                        <div>
                            <h2>Ticket Zona Lateral</h2>
                            <p>Precio: <span className="text-white">$50</span></p>
                        </div>
                        <div className="ml-3">
                            <select className="rounded border mr-2">
                            {[...Array(11)].map((_, i) => 
                                <option key={i} value={i}>{i}</option>
                            )}
                            </select>
                            <p>restantes: 10</p>
                        </div>
                        </div>
                        <div className="flex items-center w-max text-Orange ml-14 mt-5" style={{ fontFamily: "Poppins" }}>
                        <div>
                            <h2>Ticket VIP</h2>
                            <p>Precio: <span className="text-white">$100</span></p>
                        </div>
                        <div className="ml-3">
                            <select className="rounded border mr-2">
                            {[...Array(11)].map((_, i) => 
                                <option key={i} value={i}>{i}</option>
                            )}
                            </select>
                            <p>restantes: 10</p>
                        </div>
                    </div>


                    {/* Botones de Volver y Pagar */}
                    <div className="flex justify-end">
                        <button className="mr-2 bg-yellow-500 rounded-lg text-blue-900 hover:bg-yellow-600 active:bg-yellow-700">Volver</button>
                        <button className="bg-yellow-500 rounded-lg text-blue-900 hover:bg-yellow-600 active:bg-yellow-700">Pagar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}


export default BuyTicket;
