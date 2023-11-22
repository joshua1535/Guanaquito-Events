import './MyTickets.module.css';
import classes from './MyTickets.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import React, { useState } from "react";
import { useEffect } from "react";
import {
    Carousel,
    Navbar,
    MobileNav,
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
    Collapse,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronRightIcon,
  } from "@heroicons/react/24/outline";
  
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { ticketService } from '../../Services/ticketService';
import { v4 as uuidv4 } from 'uuid';
import { registerService } from '../../Services/registerService';

function TicketItem({ ticket }) {
    const { eventTitle, eventPicture, eventDate, ticketTier, available, time } = ticket;
    const { user, token} = useUserContext();

    const navigate = useNavigate();
    

    const redeemTicketHandler = (eventCode, ticketCode, ticketTier) => {

      registerService.getRegisterByTicketCode(ticketCode, token)
      .then((register) => {
         //Obtener el primer elemento del array
        register = register[0];
        console.log(register);
         //Si el registro del ticket no existe
         if (register === undefined) {
          const uuid = uuidv4();
          registerService.saveTicket(ticketCode, uuid, token);
          navigate(`/qr/${eventCode}/${ticketCode}/tier/${ticketTier}/register/${uuid}`);
        }
        //Si el registro del ticket existe
        
        registerService.getStatus(token, ticketCode, register?.transactionCode)
        .then((status) => {
        


          console.log(status.remainingMinutes);
          console.log(status.remainingSeconds);
          console.log(register.transactionCode);
       
        //Si el ticket ya fue validado, no se puede volver a validar
        if(register.validationTime !== null){
          alert('El ticket ya fue validado');
          return;
        }

        //Si el QR ya fue generado, pero aun tiene tiempo de validez
        else if (status.remainingMinutes !== null && (register.remainingMinutes !== 0 && register.remainingSeconds !== 0) && status.remainingSeconds !== null &&  register.transactionCode !== null) {
          console.log ("El QR ya fue generado, pero aun tiene tiempo de validez");
          navigate(`/qr/${eventCode}/${ticketCode}/tier/${ticketTier}/register/${register.transactionCode}`);
        }

        //Si el QR ya fue generado, y ya expiró
        else if (status.remainingMinutes === null  && status.remainingSeconds === null &&  register.transactionCode !== null) {
          const uuid = uuidv4();
          registerService.updateTransactionCode(uuid.toString(), ticketCode, token);
          navigate(`/qr/${eventCode}/${ticketCode}/tier/${ticketTier}/register/${uuid}`);
        }


      }
      
      )
      .catch((err) => {
        console.log(err);
      });
    })

    };

    const transferTicketHandler = () => {
      navigate("/transferticket");
    };
  
    return (
      <div className={[classes["cardTicketContainer"]]}>
         <div >
            {!available ? (
              <Chip variant='ghost' color="red" value='Canjeado' className="m-auto p-2 font-text">
              </Chip>
            ) : (
              <Chip variant='ghost' color="green" value='Disponible' className="m-auto p-2 font-text">
              </Chip>
            )}     
          </div>
        <Card className="shadow-none p-2">
         
          <img src={eventPicture} alt={eventTitle} className={[classes["cardImg"]]} />
          <div className="p-4">
            <div className={[classes["textCardContainer"]]}>
              <Typography 
              className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Fecha:
              </Typography>
              <Typography 
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {eventDate}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography 
            className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Hora:
              </Typography>
              <Typography
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {time}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography
            className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Evento:
              </Typography>
              <Typography 
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text break-words
                hover:break-all w-36 h-7 overflow-auto">
                {eventTitle}
              </Typography>
            </div>
            <div className={[classes["textCardContainer"]]}>
            <Typography 
            className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Ubicación:
              </Typography>
              <Typography
              className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {ticketTier}
              </Typography>
            </div>
            <div className="flex items-center justify-between mt-4">
              {available && (
                <Button
                    onClick={() => redeemTicketHandler(ticket.eventCode, ticket.ticketCode, ticketTier)}
                    variant="filled"
                    color="amber"
                    className="font-text"
                >
                    Canjear
                </Button>

              )}
                {available && (
                <Button
                    onClick={() => transferTicketHandler()}
                    variant="outlined"
                    color="blue"
                    className="font-text ml-2 w-auto h-auto"
                >
                    Transferir
                </Button>

                )}

            </div>
          </div>
        </Card>
      </div>
    );
  }


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
  const { logout } = useUserContext();

  const navigate = useNavigate();
  const handleMenu = (label) => {
    if (label === "Sign Out") {
      closeMenu();
      logout();
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

export default function MyTickets(){

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { user, token} = useUserContext();
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState(6);

    useEffect(() => {
        if(token) {
          ticketService.getTicketsByUser(token, size, page)
          .then((res) => {
            setTickets(res.content);
            setLastPage(res.total_pages);
            setTotalElements(res.total_elements);
          }
          )
          .catch((err) => console.log(err));
        }
      }, [token, page, size]);

      useEffect(() => {
        console.log(totalElements);
        console.log (lastPage);
      }, [totalElements, lastPage]);

      const handleNextPage = () => {
        if (page < lastPage - 1) {
          setPage((cur) => cur + 1);
        }
      };

      const handlePrevPage = () => {
        if (page > 0) {
          setPage((cur) => cur - 1);
        }
      };

      const handleFirstPage = () => {
        setPage(0);
      };

      const handleLastPage = () => {
        setPage(lastPage - 1);
      };



    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "My Tickets";
        }, []);
    
        return (
            <div className={[classes["generalContainer"]]}>
        <header className={[classes["headerContainer"]]}>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-dark-blue border-none">
      <div className={[classes["headerTypography"]]}>
        <img src={logo} alt="logo" className="h-12 w-12 mx-4" />
        <Typography
        children="Guanaco Business"
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
        <div className={[classes["bodyContainer"]]}>
            <h1 className={[classes["title"]]}>Mis Tickets</h1>
            {/* Boton para poder ir a transferir tickets */}
            <div className='flex justify-center mt-3'>
              <Link to="/transferticket">
                <Button className='bg-yellowCapas Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844 md:mb-5 hover:bg-yellow-700'>
                  Transferir Tickets
                </Button>
              </Link>
            </div>

            <div className={[classes["cardContainer"]]}>
            {tickets.map((ticket, index) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="flex justify-center items-center my-12">
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handleFirstPage}
        >
          <ChevronDoubleLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handlePrevPage}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Typography children={page + 1} className="mx-8 text-white" />
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handleNextPage}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          color="blue"
          className="mr-2"
          onClick={handleLastPage}
        >
          <ChevronDoubleRightIcon className="h-6 w-6" />
        </Button>
          </div>
        </div>
             <footer className=" bg-bluefooter text-white mt-5 py-4 px-6 text-center">

        <div className='relative mx-auto flex mb-5 items-center text-white'>        
          <img src={logo} alt="logo" className="h-12 w-12 mr-2 mb-2" />
          <Typography
          children="Guanaco Business"
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
    };
