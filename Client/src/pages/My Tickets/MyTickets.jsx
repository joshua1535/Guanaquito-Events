import './MyTickets.module.css';
import classes from './MyTickets.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import React from "react";
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
  } from "@heroicons/react/24/outline";
  import { useNavigate } from 'react-router-dom';
  import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

  const Tickets = [
    {
      id: 1,
      name: "Mario Bros Películasadasdasdasdsadassdasdadasds",
      date: "2023-06-05",
      time: "12:00",
      location: "VIP",
      price: "100",
      img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
      canjeado: false,
    },
    {
      id: 2,
      name: "Pink Floyd",
      date: "2023-06-02",
      time: "18:00",
      location: "General",
      price: "100",
      img: "https://i0.wp.com/mixturapop.com/wp-content/uploads/2019/06/camacu%C3%A1.jpg?fit=700%2C390&ssl=1",
      canjeado: true,
    },
    {
        id: 3,
        name: "Fas vs Dragon, Fecha 15",
        date: "2023-06-02",
        time: "12:00",
        location: "Platea",
        price: "100",
        img: "https://futbolcentroamerica.com/__export/1667069866944/sites/futbolcentroamerica/img/2022/10/28/fas-dragon.jpg_242310155.jpg",
        canjeado: true,
        },
    {
        id: 4,
        name: "Doctor Extraño 2",
        date: "2023-06-02",
        time: "12:00",
        location: "Asiento H11",
        price: "100",
        img: "https://sm.ign.com/ign_es/movie/d/doctor-str/doctor-strange-in-the-multiverse-of-madness_4pjr.jpg",
        canjeado: true,
        },
    {
        id: 5,
        name: "Ballet Nacional",
        date: "2023-06-02",
        time: "12:00",
        location: "2da planta",
        price: "100",
        img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
        canjeado: true,
        },
    {
        id: 6,
        name: "Rapidos y Furiosos 50",
        date: "2023-06-05",
        time: "14:00",
        location: "VIP",
        price: "100",
        img: "https://scontent.fsal1-1.fna.fbcdn.net/v/t1.6435-9/83985608_2698845866837972_8598443248630890496_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Z2DnxlcifAQAX_cvnU1&_nc_ht=scontent.fsal1-1.fna&oh=00_AfDC6kkN8jI_wPcv_qgM1kCqubpKI_tZh-YSsTLuGVG93Q&oe=64A4A88E",
        canjeado: false,

    },
    // ...rest of the tickets
  ];

Tickets.sort((a, b) => new Date(b.date) - new Date(a.date));


function TicketItem({ ticket }) {
    const { name, date, time, location, img, canjeado } = ticket;

    const navigate = useNavigate();

    const redeemTicketHandler = () => {
      navigate("/qr");
    };

    const transferTicketHandler = () => {
      navigate("/transferticket");
    };
  
    return (
      <div className={[classes["cardTicketContainer"]]}>
         <div >
            {canjeado ? (
              <Chip variant='ghost' color="red" value='Canjeado' className="m-auto p-2 font-text">
              </Chip>
            ) : (
              <Chip variant='ghost' color="green" value='Disponible' className="m-auto p-2 font-text">
              </Chip>
            )}     
          </div>
        <Card className="shadow-none p-2">
         
          <img src={img} alt={name} className={[classes["cardImg"]]} />
          <div className="p-4">
            <div className={[classes["textCardContainer"]]}>
              <Typography className="font-bold text-black PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                Fecha:
              </Typography>
              <Typography className="text-yellow-800 m-1 PC-1920*1080:text-xl PC-1600*900:text-xl PC-1366*768:text-lg PC-1280*720:text-sm
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text
                break-words hover:break-all overflow-auto
                ">
                {date}
              </Typography>
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
                {time}
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
                PC-1024*768:text-sm PC-768*1024:text-sm PC-360*640:text-sm PC-375*812:text-sm PC-414*896:text-sm PC-320*568:text-sm font-text break-words
                hover:break-all w-36 h-7 overflow-auto">
                {name}
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
                {location}
              </Typography>
            </div>
            <div className="flex items-center justify-between mt-4">
              {!canjeado && (
                <Button
                    onClick={() => redeemTicketHandler()}
                    variant="contained"
                    color="amber"
                    className="font-text"
                >
                    Canjear
                </Button>

              )}
                {!canjeado && (
                <Button
                    onClick={() => transferTicketHandler()}
                    variant="outlined"
                    color="primary"
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

export default function MyTickets(){

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

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

            <div className={[classes["cardContainer"]]}>
            {Tickets.map((ticket, index) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
      
            </div>
             <footer className=" bg-bluefooter text-white mt-5 py-4 px-6 text-center">

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
    };
