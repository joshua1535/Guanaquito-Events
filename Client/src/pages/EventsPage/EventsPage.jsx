import React, { useState, useEffect } from 'react';
import './EventsPage.module.css';
import logo from '../../assets/logo.png';
import classes from './EventsPage.module.css';
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

const EventsPage = () => {
  const categories = ["Todos", "Cine", "Conciertos", "Obras de teatro", "Deportes"];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const [events, setEvents] = useState({
    'Todos':[],
    'Cine': [],
    'Conciertos': [],
    'Obras de teatro': [],
    'Deportes': []
  });
  const { user, token} = useUserContext();

  console.log('mi token es:',token);

  useEffect(() => {
    if(token){
      eventService.getAllEvents(token)
          .then((data) => {
            setEvents(prevEvents => ({...prevEvents, Todos: data.content}));          
              console.log('Los eventos obtenidas:', events.Todos);
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      }
  }, [token]); 

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    if(token){
      eventService.getEventsByCategory('CI',page,size,token,)
          .then((data) => {
            if(data===undefined)
            {

            }
            else{
            setEvents(prevEvents => ({...prevEvents, Cine: data.content}));          
              console.log('Los eventos cine obtenidas:', events.Cine);
            }
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      }
  }, ['CI',page,size,token]); 

  

  useEffect(() => {
    if(token){
      eventService.getEventsByCategory('MU',page,size,token)
          .then((data) => {
            if(data===undefined)
            {

            }
            else{
            setEvents(prevEvents => ({...prevEvents, Conciertos: data.content}));          
              console.log('Los eventos Conciertos obtenidas:', events.Conciertos);
            }
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      }
  }, ['MU',page,size,token]); 

  useEffect(() => {
    if(token){
      eventService.getEventsByCategory('OB',page,size,token,)
          .then((data) => {
            if(data===undefined)
            {

            }
            else{
            setEvents(prevEvents => ({...prevEvents, "Obras de teatro": data.content}));          
              console.log('Los eventos teatro obtenidas:', events['Obras de teatro']);
            }
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      }
  }, ['OB',token]); 

  useEffect(() => {
    if(token){
      eventService.getEventsByCategory('DE',page,size,token)
          .then((data) => {
            if(data===undefined)
            {

            }
            else{
            setEvents(prevEvents => ({...prevEvents, Deportes: data.content}));          
              console.log('Los eventos teatro obtenidas:', events.Deportes);
            }
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      }
  }, ['DE',token]); 

  


  const navigate = useNavigate();

  const viewBuyTicketsHandler = () => {
    navigate("/buytickets");
  };


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <header className={[classes["headerContainer"]]}>
        <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
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
        {selectedCategory == 'Conciertos' &&
        <Typography
          as="a"
          href="#"
          className="mr-4 text-xl sm:hidden inline-block  cursor-pointer py-1.5 font-medium text-white"
          style={{ fontFamily: "PoppinsLight" } }
        >
          Conciertos
        </Typography>
        }
        {selectedCategory == 'Cine' &&
        <Typography
          as="a"
          href="#"
          className="mr-4 text-xl sm:hidden inline-block  cursor-pointer py-1.5 font-medium text-white"
          style={{ fontFamily: "PoppinsLight" } }
        >
          Cine
        </Typography>
        }
        {selectedCategory == 'Todos' &&
        <Typography
          as="a"
          href="#"
          className="mr-4 text-xl sm:hidden inline-block  cursor-pointer py-1.5 font-medium text-white"
          style={{ fontFamily: "PoppinsLight" } }
        >
          Todos
        </Typography>
        }
        {selectedCategory == 'Obras de teatro' &&
        <Typography
          as="a"
          href="#"
          className="mr-4 text-xl sm:hidden inline-block  cursor-pointer py-1.5 font-medium text-white"
          style={{ fontFamily: "PoppinsLight" } }
        >
          Obras de teatro
        </Typography>
        }
        {selectedCategory == 'Deportes' &&
        <Typography
          as="a"
          href="#"
          className="mr-4 text-xl sm:hidden inline-block  cursor-pointer py-1.5 font-medium text-white"
          style={{ fontFamily: "PoppinsLight" } }
        >
          Deportes
        </Typography>
        }
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
        <NavList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </MobileNav>
      </Navbar>
    </header>
      <div className="flex flex-col sm:flex-row h-screen bg-dark-blue">
        <div className={classes["optionsContainer"]}>
          <ul >
            {categories.map(category => (
              <li className="mb-2 text-center" key={category}>
                <button 
                className=" mt-3 hover:bg-dark-blue active:scale-90 transition-all duration-150 rounded-md py-1 px-2"
                onClick={() => setSelectedCategory(category)}
                >{category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full bg-dark-blue sm:w-3/4 p-4 overflow-auto">
          <div className="flex  p-0 flex-wrap sm:space-x-4 justify-center">
          {events[selectedCategory].map((event, index) => (
              <div className=" p-4 rounded-lg m-2 sm:m-0" key={index}>
                <div className="w-40 h-56 overflow-hidden relative">
                      {/* Imagen */}
                      <img
                        src={event.image}
                        alt="Imagen de evento"
                        className="w-full h-full object-cover mb-2 rounded transform transition-all duration-300 hover:opacity-5"
                      />

                      {/* Texto del hover */}
                      <div style={ { fontFamily: "PoppinsLight" }} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-black bg-opacity-70 text-Orange font-bold transition-all duration-300 hover:opacity-100">
                        <p className="text-xl">{event.title}</p>
                        <p className="text-lg">{event.date}</p>
                      </div>
                    </div>
                <button 
                onClick={viewBuyTicketsHandler}
                className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                style={ { fontFamily: "PoppinsLight" }}
                >Comprar boleto
                </button>
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
    </>
  );
};

export default EventsPage;
