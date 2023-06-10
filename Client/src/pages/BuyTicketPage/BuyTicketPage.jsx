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
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


// profile menu component
const profileMenuItems = [
  {
    label: "Mis tickets",
  },
  {
    label: "Historial de eventos",
  },
  {
    label: "Mis ordenes",
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

  const navigate = useNavigate();
  const handleMenu = (label) => {
    if (label === "Sign Out") {
      closeMenu();
      navigate("/");
      
    }
    
    if (label === "Eventos") {
      closeMenu();
      navigate("/events");
    }

    if (label === "Mis tickets") {
      closeMenu();
      navigate("/mytickets");
    }

    if (label === "Historial de eventos") {
      closeMenu();
      navigate("/historyevents");
    }

    if (label === "Mis ordenes") {
      closeMenu();
      navigate("/myorders");
    }


  };

  
  
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
              onClick={() => handleMenu(label)}
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
  const navigate = useNavigate();
  
  const navListHandler = (label) => {
    if (label === "Eventos") {
      navigate("/events");
    } else if (label === "Mis tickets") {
      navigate("/mytickets");
    }
  };


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
          <MenuItem 
          onClick={() => navListHandler(label)}
          className="flex items-center gap-2 lg:rounded-full">
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
  
  const eventDetails = {
    title: 'ColdPlay Tour',
    date: '2023-06-04',
    time: '20:15',
    participants: ['Mi Primo', 'Mi tio', 'Ronaldinho'],
    sponsors: ['Nayb Bukele', 'Elon Musk', 'Bill Gates  '],
    category: 'Conciertos',
    price: '$100',
  };


  const BuyTicket = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [activeButton, setActiveButton] = useState(1);

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

      
        


    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false)
      );
    }, []);

    return (
        <>
        <div className="flex flex-col justify-between min-h-screen">
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
        <div className={[classes["generalContainer"]]}>
            <div className="flex w-3/4 h-3/4 shadow-md overflow-hidden">
                <img 
                    className={[classes["imgContainer"]]}
                    src="https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png" 
                    alt="Event"
                />
                <div 
                    className={[classes["infoContainer"]]}
                    style={{ backgroundImage: 'url(https://i.postimg.cc/d3MywV5s/imagen-2023-06-05-090157807.png)' }} 
                    >
                    {/* Zona superior con dos columnas de botones */}

                    
                    <div
                     className={[classes["topbuttonsContainer"]]}
                     >
                        <button
                        onClick={handleButtonClick2} 
                        className={`
                        PC-800*600:text-base PC-1280*720:text-xl PC-800*600:w-1/2
                        PC-640*480:text-xs PC-640*480:w-1/2  
                        sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${showDetails === false ? 'bg-Orange text-blue-900' : 'bg-dark-blue text-white hover:bg-orange-600'}`}
                        style={{ fontFamily: "Poppins" }}
                        >COMPRAR</button>
                        <button 
                        onClick={handleButtonClick}
                        className={`
                        PC-1280*720:text-base PC-800*600:text-sm  PC-800*600:w-1/2
                        PC-640*480:text-sm PC-640*480:w-1/2  PC-640*480:text-center 
                        sm:w-full sm:h-12 sm:text-2xl  sm:py-1  sm:rounded ${showDetails === true ? 'bg-Orange text-blue-900 ' : 'bg-dark-blue text-white hover:bg-orange-600'}
                          text-blue-900 `}
                        style={{ fontFamily: "Poppins" }}
                          >DETALLES DEL EVENTO</button>
                    </div>

                    {showDetails ? (
      // Si showDetails es true, mostramos la información del evento
                        <div className="">
                          <h1
                          className={[classes["titleH1"]]}
                          >{eventDetails.title}
                          </h1>

                          <p className={[classes["pData"]]}>
                              <span
                              className={[classes["titleSpan"]]}
                              >Fecha: </span> 
                              <span 
                              className={[classes["contentSpan"]]}
                              >{eventDetails.date}</span>
                          </p>
                          <p className={[classes["pData"]]}>
                              <span className={[classes["titleSpan"]]}>Hora: </span> 
                              <span className={[classes["contentSpan"]]}>{eventDetails.time}</span>
                          </p>
                          <p className={[classes["pData"]]}>
                              <span className={[classes["titleSpan"]]}>Participantes: </span> 
                              <span className={[classes["contentSpan"]]}>{eventDetails.participants.join(', ')}</span>
                          </p>
                          <p className={[classes["pData"]]}>
                              <span className={[classes["titleSpan"]]}>Patrocinadores: </span> 
                              <span className={[classes["contentSpan"]]}>{eventDetails.sponsors.join(', ')}</span>
                          </p>
                          <p className={[classes["pData"]]}>
                              <span className={[classes["titleSpan"]]}>Categoría: </span> 
                              <span className={[classes["contentSpan"]]}>{eventDetails.category}</span>
                          </p>
                        </div>
                      ) : (  
                        <>             
                    <div className=" 
                    PC-1280*720:ml-3 PC-1280*720:mt-3
                    PC-800*600:ml-3 PC-800*600:mt-2  
                    PC-640*480:ml-1 PC-640*480:mt-2
                    flex items-center w-fit text-Orange ml-14 mt-7" style={{ fontFamily: "Poppins" }}>
                        <div>
                            <h2 
                              className={[classes["ticketText"]]}
                             >Ticket Zona Lateral</h2>
                            <p className={[classes["ticketPrice2"]]}>Precio: <span className={[classes["ticketPrice"]]}>
                                {eventDetails.price}
                              </span>
                            </p>
                        </div>
                        <div className="PC-640*480:ml-1 ml-3">
                            <select className={[classes["dropboxContainer"]]} >
                            {[...Array(11)].map((_, i) => 
                                <option key={i} value={i}>{i}</option>
                            )}
                            </select>
                            <p className={[classes["ticketPrice2"]]}>restantes: 10</p>
                        </div>
                        </div>
                        <div className="
                        PC-1280*720:ml-3 PC-1280*720:mt-3
                        PC-800*600:ml-3 PC-800*600:mt-4
                         PC-640*480:ml-1 flex items-center w-fit text-Orange ml-14 mt-5" style={{ fontFamily: "Poppins" }}>
                        <div>
                            <h2 className={[classes["ticketText"]]}>Ticket VIP</h2>
                            <p className={[classes["ticketPrice2"]]} >Precio: <span className={[classes["ticketPrice"]]}>$100</span></p>
                        </div>
                        <div className="ml-3">
                            <select className={[classes["dropboxContainer"]]}>
                            {[...Array(11)].map((_, i) => 
                                <option key={i} value={i}>{i}</option>
                            )}
                            </select>
                            <p className={[classes["ticketPrice2"]]}>restantes: 10</p>
                        </div>
                    </div>
                    </>
    )}
                    {/* Botones de Volver y Pagar */}                    
                    <div className={[classes["botbuttonsContainer"]]}>
                        <button 
                        onClick={handleBackButton}
                        className=" 
                        PC-1280*720:w-32 C-1280*720:h-12                        
                        PC-800*600:w-24 PC-800*600:h-10
                        PC-640*480:w-20 PC-640*480:h-7
                         mr-2 h-14 w-44 bg-dark-blue rounded-full text-white hover:bg-gray-900 ">Volver</button>
                        <button 
                        onClick={handleBuyButton}
                        className=" 
                        PC-1280*720:w-32 C-1280*720:h-12 
                        PC-800*600:w-24 PC-800*600:h-10 
                        PC-640*480:w-20 PC-640*480:h-7 
                         bg-Orange   h-14 w-44 rounded-full text-white hover:bg-orange-600">Pagar</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="sm:hidden flex flex-col items-center h-72 w-full bg-cover"
             style={{ backgroundImage: `url(https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png)` }}
        >
            <img 
                className=" w-3/5 object-cover mt-6 mb-6" 
                src='https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png'
                alt="Event"
            />

            <h1 className="text-white  text-center text-2.5xl"
                style={{ fontFamily: "PoppinsSemiBold" }}
            >
                {eventDetails.title}
            </h1>

            <div className="flex flex-col items-center  text-white p-4 rounded">
                <p className='text-xl'>
                    <span className="font-light"  style={{ fontFamily: "PoppinsLight" }}>Fecha: </span>
                    <span className="font-bold" style={{ fontFamily: "PoppinsLight" }}>{eventDetails.date}</span>
                </p>
                <p className='text-xl'>
                    <span className="font-light" style={{ fontFamily: "PoppinsLight" }}>Hora: </span> 
                    <span className="font-bold" style={{ fontFamily: "PoppinsLight" }}>{eventDetails.time}</span>
                </p>
                <p className='flex pt-2 text-3xl font-bold'>
                    <span className=" text-2xl font-light mr-2" style={{ fontFamily: "PoppinsLight" }}>Precio: </span> 
                    <span className="text-3xl text-Orange" style={{ fontFamily: "PoppinsBold" }}>{eventDetails.price}</span>
                </p>

                <button className="bg-Orange h-14 w-full  rounded-full text-white text-xl"
                    style={{ fontFamily: "Poppins" }}
            >
                Comprar Tickets
            </button>
            </div>
        </div>
        <footer className=" hidden sm:block  bg-bluefooter text-white mt-5 py-4 px-6 text-center">

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
}


export default BuyTicket;
