import './HomePage.module.css';
import classes from './HomePage.module.css';
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
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
];

//obtener los 3 eventos mas recientes en base a la fecha, necesito sacar la imagen
const getImg = (listEvents) => {
  // Ordenar los eventos por fecha de forma descendente
  const sortedEvents = [...listEvents].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Obtener las imágenes de los 3 eventos más recientes
  const recentImages = sortedEvents.slice(0, 3).map(event => event.img);
  
  return recentImages;
};

const movieEvents = [
  {
    title: "Mario",
    description: "Descripcion del evento 1",
    date: "01/01/2021",
    img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
    precio: "10.00",
  },
  {
    title: "Pink Floyd",
    description: "Descripcion del evento 2",
    date: "02/02/2022",
    img: "https://i0.wp.com/mixturapop.com/wp-content/uploads/2019/06/camacu%C3%A1.jpg?fit=700%2C390&ssl=1",
    precio: "10.00",
  },
  {
    title: "Fas vs Dragon",
    description: "Descripcion del evento 3",
    date: "03/03/2021",
    img: "https://futbolcentroamerica.com/__export/1667069866944/sites/futbolcentroamerica/img/2022/10/28/fas-dragon.jpg_242310155.jpg",
    precio: "10.00",
  },
  {
    title: "Ballet Nacional",
    description: "Descripcion del evento 4",
    date: "04/01/2019",
    img: "https://www.cultura.gob.sv/wp-content/uploads/2022/02/Ballet-naciola-105.png",
    precio: "10.00",
  },
  {
    title: "Mario",
    description: "Descripcion del evento 1",
    date: "01/01/2021",
    img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
    precio: "10.00",
  },
  {
    title: "Mario",
    description: "Descripcion del evento 1",
    date: "01/01/2021",
    img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
    precio: "10.00",
  },
  {
    title: "Mario",
    description: "Descripcion del evento 1",
    date: "01/01/2021",
    img: "https://es.web.img3.acsta.net/img/33/23/3323b2b747cf67abb82016922a56fe7c.jpg",
    precio: "10.00",
  },
];

const getMovieImg = (movieEvents) => {
  // Ordenar los eventos por fecha de forma descendente
  const sortedEvents = [...movieEvents].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Obtener las imágenes de los 3 eventos más recientes
  const recentImages = sortedEvents.slice(0, 3).map(event => event.img);

  return recentImages;
};


const cardData = [
  { id: 1, title: 'CINE', imageUrl: 'https://c8.alamy.com/compes/2h0cj74/composicion-con-palomitas-de-maiz-y-carrete-de-cine-sobre-la-mesa-sobre-fondo-de-color-espacio-para-texto-2h0cj74.jpg' },
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
      <button className={classes["viewMoreButtonMobile"]}>Ver todos</button>
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

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [recentEventImages, setRecentEventImages] = React.useState([]);
  const [recentMovieImages, setRecentMovieImages] = React.useState([]);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  useEffect(() => {
    // Obtener las imágenes de los 3 eventos más recientes
    const recentImages = getImg(listEvents);
    setRecentEventImages(recentImages);
  }, []);

  useEffect(() => {
    // Obtener las imágenes de las 3 películas más recientes
    const recentImages = getMovieImg(movieEvents);
    setRecentMovieImages(recentImages);
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
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
      </Navbar>
    </header>
      <Carousel className={classes["carouselContainer"]}>
  {recentEventImages.map((image, index) => (
    <div className={classes["imgContainer"]} key={index}>
      <img src={image} alt={`image ${index + 1}`} className={classes["imgCarouselFormat"]} />
      <div className={classes["imgBackgroundContainer"]}>
        <div className={classes["buttonContainer"]}>
          <div className="flex gap-2">
            <button className={classes["buttonCarousel"]}>Tickets</button>
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
          <img src="https://c8.alamy.com/compes/2h0cj74/composicion-con-palomitas-de-maiz-y-carrete-de-cine-sobre-la-mesa-sobre-fondo-de-color-espacio-para-texto-2h0cj74.jpg"
           alt="Cine" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
          {/* Tarjetas de eventos más pequeñas */}
          {movieEvents.slice(0, 6).map((event, index) => (
          
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
              <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
              <div className={classes["cardContent"]}>
                <h3 className={classes["eventTitle"]}>{event.title}</h3>
                <p className={classes["eventTitle"]}> ${event.precio}</p>
              </div>
            </Card>

          ))}
        </div>
</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Cine</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://c8.alamy.com/compes/2h0cj74/composicion-con-palomitas-de-maiz-y-carrete-de-cine-sobre-la-mesa-sobre-fondo-de-color-espacio-para-texto-2h0cj74.jpg"
           alt="Cine" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
          {/* Tarjetas de eventos más pequeñas */}
          {movieEvents.slice(0, 6).map((event, index) => (
          
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
              <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
              <div className={classes["cardContent"]}>
                <h3 className={classes["eventTitle"]}>{event.title}</h3>
                <p className={classes["eventTitle"]}> ${event.precio}</p>
              </div>
            </Card>

          ))}
        </div>
</div>
<div className={[classes["eventsTitle"]]}>
          <h1>Cine</h1></div>     
          <div className={classes["eventsContainer"]}>
        <div className={classes["leftColumn"]}>
          {/* Imagen representativa */}
          <img src="https://c8.alamy.com/compes/2h0cj74/composicion-con-palomitas-de-maiz-y-carrete-de-cine-sobre-la-mesa-sobre-fondo-de-color-espacio-para-texto-2h0cj74.jpg"
           alt="Cine" className={classes["categoryImage"]} />

          {/* Botón "Ver más eventos de esta categoría" */}
          <button className={classes["viewMoreButton"]}>Ver más</button>
        </div>

        <div className={classes["rightColumn"]}>
          {/* Tarjetas de eventos más pequeñas */}
          {movieEvents.slice(0, 6).map((event, index) => (
          
            <Card key={index} className='m-2 mt-0 rounded-md border-blue-gray-300 border-2 h-auto'> 
              <img src={event.img} alt={event.title} className={classes["smallCardImage"]} />
              <div className={classes["cardContent"]}>
                <h3 className={classes["eventTitle"]}>{event.title}</h3>
                <p className={classes["eventTitle"]}> ${event.precio}</p>
              </div>
            </Card>

          ))}
        </div>

</div>
<SliderCards/>
</div>
      );
      
    }


