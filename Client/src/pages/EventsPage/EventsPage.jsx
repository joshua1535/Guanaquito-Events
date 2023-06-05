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
    mobilelabel: 'Todos',
  },
  {
    label: "Mis tickets",
    mobilelabel: 'Cine',
  },
  {
    label: "",
    mobilelabel: 'Conciertos',
  },
  {
    label: "",
    mobilelabel: 'Obras de teatro',
  },
  {
    label: "",
    mobilelabel: 'Deportes',
  },
  
];

function NavList({ selectedCategory, setSelectedCategory  }) {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  // Oculta la barra de navegación móvil cuando la ventana es lo suficientemente grande.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileNavVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);

    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      setMobileNavVisible(false); // Cierra la barra de navegación móvil cuando se selecciona una categoría
    };

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label,mobilelabel}, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="lg"
          color="white"
          className="font-normal "
        >
          {label !== "" &&
          <MenuItem 
          className="hidden mobi sm:inline-block hover:bg-Orange hover:text-black active:bg-Orange active:text-black items-center gap-2 lg:rounded-full"
          style={{ fontFamily: "PoppinsLight" } }
          >
            {label}
          </MenuItem>
            }
          <MenuItem 
          className="sm:hidden PC-1920*1080:hidden PC-1600*900:hidden PC-1366*768:hidden inline-block hover:bg-Orange hover:text-black active:bg-Orange active:text-black items-center gap-2 lg:rounded-full"
          style={{ fontFamily: "PoppinsLight" } }
          onClick={() => handleCategoryClick(mobilelabel)}>
            {mobilelabel}
          </MenuItem>
        </Typography>        
      ))}
    </ul>
  );
}

const images = ["https://i.postimg.cc/jSYFqTwS/imagen-2023-06-04-160806457.png", "https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png", "https://i.postimg.cc/3RGLQb8v/imagen-2023-06-04-161025997.png","https://m.media-amazon.com/images/I/719OZIZMTpL._AC_UF894,1000_QL80_.jpg "];




const EventsPage = () => {
  const categories = ["Todos", "Cine", "Conciertos", "Obras de teatro", "Deportes"];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const images1 = {
    'Todos': ['https://i.postimg.cc/jSYFqTwS/imagen-2023-06-04-160806457.png'],
    'Cine': ['https://i.postimg.cc/TwKzL9Rd/imagen-2023-06-04-160931135.png'],
    'Conciertos': ['https://i.postimg.cc/3RGLQb8v/imagen-2023-06-04-161025997.png'],
    'Obras de teatro': ['https://m.media-amazon.com/images/I/719OZIZMTpL._AC_UF894,1000_QL80_.jpg'],
    'Deportes': ['https://assets-prd.ignimgs.com/2022/09/14/zelda-tears-of-the-kingdom-button-2k-1663127818777.jpg'],
  };


  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

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
      <div className="flex flex-col sm:flex-row h-screen bg-gray-200">
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
        <div className="w-full h-screen bg-dark-blue sm:w-3/4 p-4">
          <div className="flex flex-wrap sm:space-x-4 justify-center">
            {images1[selectedCategory].map((imgSrc, index)=> (
              <div className="p-4 rounded-lg m-2 sm:m-0" key={index}>
                <img 
                src={imgSrc} alt="Imagen de evento"
                className=" w-40 h-56 object-cover mb-2 rounded"/>
                <button 
                className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                style={ { fontFamily: "PoppinsLight" }}
                >Comprar boleto
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
