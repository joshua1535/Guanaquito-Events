import './HomePage.module.css';
import classes from './HomePage.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import React, { useState } from "react";
import { useEffect } from "react";
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
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowLongRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';

const listEvents = [
  {
    title: "Mario",
    description: "Descripcion del evento 1",
    date: "01/01/2021",
    img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
  },
  {
    title: "Pink Floyd",
    description: "Descripcion del evento 2",
    date: "02/02/2023",
    img: "https://i0.wp.com/mixturapop.com/wp-content/uploads/2019/06/camacu%C3%A1.jpg?fit=700%2C390&ssl=1",
  },
  {
    title: "Fas vs Dragon",
    description: "Descripcion del evento 3",
    date: "03/03/2021",
    img: "https://futbolcentroamerica.com/__export/1667069866944/sites/futbolcentroamerica/img/2022/10/28/fas-dragon.jpg_242310155.jpg",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 4",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 5",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 6",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
  },
];


const cardData = [
  { id: 1, title: 'CINE', imageUrl: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/03/palomitas-sala-cine-2992264.jpg?tf=3840x' },
  { id: 2, title: 'CONCIERTO', imageUrl: 'https://thumbs.dreamstime.com/b/muchedumbre-del-concierto-10447765.jpg' },
  { id: 3, title: 'TEATRO', imageUrl: 'https://www.hoyesarte.com/wp-content/uploads/2009/08/teatro-2.jpg' },
  { id: 4, title: 'DEPORTES', imageUrl: 'https://i.ytimg.com/vi/uGU1IztR5rg/maxresdefault.jpg' },
  // Agrega más tarjetas si es necesario
];

const SliderCards = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Habilita el centro del modo
    centerPadding: '25%', // Ajusta el espacio para mostrar una porción de la siguiente tarjeta (25% en este caso)
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
          swipe: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          swipe: true,
          centerPadding: '20%', // Ajusta el espacio en dispositivos móviles
        },
      },
    ],
  };
  const navigate = useNavigate();

  const viewEventsHandler = () => {
    navigate("/events");
  };
  

  return (
    <div className={[classes["sliderMobileContainer"]]}>

      <Slider {...settings}>
        {cardData.map((card) => (
          <div key={card.id} className="p-4">
            <div className="relative bg-white rounded shadow h-64 border-2 border-gray-300">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <h2 className="text-lg font-bold">{card.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button 
      onClick={viewEventsHandler}
      className={classes["viewMoreButtonMobile"]}>Ver todos</button>
    </div>
  );
};




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

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [recentMoviesEvents, setRecentMoviesEvents] = useState([]);
  const [recentSportsEvents, setRecentSportsEvents] = useState([]);
  const [recentConcertsEvents, setRecentConcertsEvents] = useState([]);
  const [recentTheaterEvents, setRecentTheaterEvents] = useState([]);
  const { user, token} = useUserContext();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0); // Para controlar la página actual
  const [size] = useState(4); // Para controlar el tamaño de la página



  const navigate = useNavigate();

  const viewBuyTicketsHandler = (code) => {
    navigate(`/buytickets/${code}`);
  };

  const viewEventsHandler = () => {
    navigate("/events");
  };
  
   
  
  useEffect(() => {
    if(token){
      eventService.getCurrentEvents(0, size, token)
          .then((data) => {
            setEvents(data.content);
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
          eventService.getEventsByCategory("CI",0, 6, token)
          .then((data) => {
            setRecentMoviesEvents(data.content);
            console.log("soy las peliculas")
            console.log(data.content);
          })
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          });
      eventService.getEventsByCategory("DE",0, 6, token)
          .then((data) => {
            setRecentSportsEvents(data.content);
            console.log("soy los deportes")
            console.log(data.content);
          }
          )
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          }
          );
      eventService.getEventsByCategory("MU",0, 6, token)
          .then((data) => {
            setRecentConcertsEvents(data.content);
            console.log("soy los conciertos")
            console.log(data.content);
          }
          )
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          }
          );
      eventService.getEventsByCategory("OB",0, 6, token)
          .then((data) => {
            setRecentTheaterEvents(data.content);
            console.log("soy los teatros")
            console.log(data.content);
          }
          )
          .catch((error) => {
              console.error('Hubo un error al obtener las eventos:', error);
          }
          );
      }
  }, [token]); 



  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
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
      <Carousel
      className={classes["carouselContainer"]}>
    {events.map(({ image }, index) => (
    <div className={classes["imgContainer"]} key={index}>
      <img src={image} alt={`image ${index + 1}`} className={classes["imgCarouselFormat"]} />
      <div className={classes["imgBackgroundContainer"]}>
        <div className={classes["buttonContainer"]}>
          <div className="flex gap-2">
            <button 
            onClick={() => viewBuyTicketsHandler(events[index].code)}
            className={classes["buttonCarousel"]}>Tickets</button>
          </div>
        </div>
      </div>
    </div>
  ))}
</Carousel>
      <div className={[classes["categoriesContainer"]]}>
        <div className={[classes["categoriesTitle"]]}>
          <h1>Categorías</h1></div>
        </div>
        <div className={[classes["eventsTitle"]]}>
          <h1>Cine</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/03/palomitas-sala-cine-2992264.jpg?tf=3840x"
           alt="Cine" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentMoviesEvents.filter((event ) => event.category.name === "Cine").length > 0 ? (
          recentMoviesEvents
            .filter((event) => event.category.name === "Cine")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>
</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Conciertos</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://thumbs.dreamstime.com/b/muchedumbre-del-concierto-10447765.jpg"
           alt="Música" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentConcertsEvents.filter((event ) => event.category.name === "Música").length > 0 ? (
          recentConcertsEvents
            .filter((event) => event.category.name === "Música")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>
</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Deportes</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://i.ytimg.com/vi/uGU1IztR5rg/maxresdefault.jpg"
           alt="Deportes" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentSportsEvents.filter((event ) => event.category.name === "Deportes").length > 0 ? (
          recentSportsEvents
            .filter((event) => event.category.name === "Deportes")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>

</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Obras de teatro</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://www.hoyesarte.com/wp-content/uploads/2009/08/teatro-2.jpg"
           alt="Obras de teatro" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button 
          onClick={viewEventsHandler}
          className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
        {/* Tarjetas de eventos más pequeñas */}
        {recentTheaterEvents.filter((event ) => event.category.name === "Obras de teatro").length > 0 ? (
          recentTheaterEvents
            .filter((event) => event.category.name === "Obras de teatro")
            .map((event, index) => (
              <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
                <img src={event.image} alt={event.title} className={classes["smallCardImage"]} />
                <div className={classes["cardContent"]}>
                  <h3 className={classes["eventTitle"]}>{event.title}</h3>
                  <p className={classes["eventTitle"]}> {event.date}</p>
                </div>
              </Card>
            ))
        ) : (
          // Tarjetas por defecto
          listEvents.map((event, index) => (
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
            <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
            <div className={classes["cardContent"]}>
              <h3 className={classes["eventTitle"]}>{event.title}</h3>
              <p className={classes["eventTitle"]}> {event.date}</p>
            </div>
          </Card>
          ))
        )}
      </div>

</div>
<SliderCards/>
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
      
    }


