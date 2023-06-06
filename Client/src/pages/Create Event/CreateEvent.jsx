import './CreateEvent.module.css';
import classes from './CreateEvent.module.css';
import logo from '../../assets/logo.png';
import imgtemplate from '../../assets/loginimg.png';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
    Input,
    Select,
    Option,
  } from "@material-tailwind/react";
  import {
    ChevronDownIcon,
    Bars2Icon,
  } from "@heroicons/react/24/outline";


  const categoryOptions = [
    "Cine",
    "Teatro",
    "Deportes",
    "Música",
    // Añade más categorías según tus necesidades
  ];

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

export default function CreateEvent() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [duration, setDuration] = useState("");
    const [participant, setParticipant] = useState("");
    const [participants, setParticipants] = useState([]);
    const [sponsor, setSponsor] = useState("");
    const [sponsors, setSponsors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleAddSponsor = () => {
        // Agregar el sponsor al array de sponsors
        setSponsors((prevSponsors) => [...prevSponsors, sponsor]);
        // Limpiar el input de sponsors
        setSponsor("");
        };

    const handleSponsorChange = (e) => {
        setSponsor(e.target.value);
        };

    const handleSponsorInputChange = (e) => {
        setSponsor(e.target.value);
        };

    const handleDeleteSponsor = (index) => {
        // Eliminar el sponsor del array de sponsors
        setSponsors((prevSponsors) =>
        prevSponsors.filter((_, i) => i !== index)
        );
        };
    
  
    const handleAddParticipant = () => {
      // Agregar el participante al array de participantes
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
      // Limpiar el input de participantes
      setParticipant("");
    };
  
    const handleParticipantChange = (e) => {
      setParticipant(e.target.value);
    };
  
    const handleParticipantInputChange = (e) => {
      setParticipant(e.target.value);
    };
  
    const handleDeleteParticipant = (index) => {
      // Eliminar el participante del array de participantes
      setParticipants((prevParticipants) =>
        prevParticipants.filter((_, i) => i !== index)
      );
    };

    const handleDurationChange = (e) => {
      // Verificar que el valor ingresado sea un número
      const value = e.target.value.replace(/\D/, "");
      setDuration(value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        };

    const handleCategoryInputChange = (e) => {
        setSelectedCategory(e.target.value);
        };
    
    

    React.useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
      }, []);

    
        useEffect(() => {
            document.title = "Create Event";
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
        <div className={[classes["bodyContainer"]]}>
            <div className={[classes["titleContainer"]]}>
                <h1 className={[classes["title1"]]}>Crear</h1>
                <h1 className={[classes["title2"]]}>evento</h1>
            </div>
            <div className={[classes["formContainer"]]}>
      <div className={[classes["form"]]}>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="eventName" className={[classes["titleInputs"]]}>
              Nombre del evento
            </label>
            <Input
              id="eventName"
              type="text"
              size="lg"
              color='white'
              placeholder="Ingrese el nombre del evento"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="participant" className={[classes["titleInputs"]]}>
              Participantes
            </label>
            <div className="flex space-x-2 Mobile-280:grid Mobile-280:grid-rows-2">
              <Input
                id="participant"
                type="text"
                size="lg"
                color='white'
                value={participant}
                onChange={handleParticipantInputChange}
                placeholder="Ingrese el nombre del participante"
              />
              <Button className='m-auto Mobile-280:mt-2 Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844 Mobile-390*844:w-28 
              Mobile-390*844:text-ButtonCarouselMobile-390*844 '
                color="blue"
                ripple="light"
                onClick={handleAddParticipant}
              >
                Agregar
              </Button>
            </div>
            {participants.length > 0 && (
              <div className="mt-2">
                <label htmlFor="participants" className={[classes["titleInputs"]]}>
                  Lista de participantes
                </label>
                <Input
                  id="participants"
                  type="text"
                  size="lg"
                  value={participants.join(", ")}
                  disabled
                />
                <ul className="mt-2 space-y-1">
                  {participants.map((participant, index) => (
                    <li key={index} className="flex items-center">
                      <span className='text-white'> - {participant}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteParticipant(index)}
                        className="ml-2 text-red-600"
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={[classes["container3Inputs"]]}>
            <div>
              <label htmlFor="category" className={[classes["titleInputs"]]}>
                Categoría
                
              </label>
                <Select className='text-white'>
                    <Option>Cine</Option>
                    <Option>Concierto</Option>
                    <Option>Obras de teatro</Option>
                    <Option>Deportes</Option>
                </Select>
            </div>
            <div>
              <label htmlFor="time" className={[classes["titleInputs"]]}>
                Hora
              </label>
              <Input
                id="time"
                type="time"
                size="lg"
                color='white'
                placeholder="Seleccione la hora"
              />
            </div>
            <div>
            <label htmlFor="duration" className={[classes["titleInputs"]]}>
              Duración (segundos)
            </label>
            <Input
              id="duration"
              type="text"
              size="lg"
              color='white'
              value={duration}
              onChange={handleDurationChange}
              placeholder="Ingrese la duración"
            />
          </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="sponsor" className={[classes["titleInputs"]]}>
              Patrocinadores
            </label>
            <div className="flex space-x-2 Mobile-280:grid Mobile-280:grid-rows-2" >
              <Input
                id="sponsor"
                type="text"
                size="lg"
                color='white'
                value={sponsor}
                onChange={handleSponsorInputChange}
                placeholder="Ingrese el nombre del patrocinador"
              />
              <Button className='m-auto Mobile-280:mt-2 Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844 Mobile-390*844:w-28
              Mobile-390*844:text-ButtonCarouselMobile-390*844'
                color="blue"
                ripple="light"
                onClick={handleAddSponsor}
              >
                Agregar
              </Button>
            </div>
            {sponsors.length > 0 && (
              <div className="mt-2">
                <label htmlFor="sponsors" className={[classes["titleInputs"]]}>
                  Lista de patrocinadores
                </label>
                <Input
                  id="sponsors"
                  type="text"
                  size="lg"
                  color='white'
                  value={sponsors.join(", ")}
                  disabled
                />
                <ul className="mt-2 space-y-1">
                  {sponsors.map((sponsor, index) => (
                    <li key={index} className="flex items-center">
                      <span className='text-white'> -{sponsor}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSponsor(index)}
                        className="ml-2 text-red-600"
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className={[classes["titleInputs"]]}>
              Fecha
            </label>
            <Input
              id="date"
              type="date"
              size="lg"
              color='white'
              placeholder="Seleccione la fecha"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="eventPhoto" className={[classes["titleInputs"]]}>
              Foto del evento
            </label>
            <Input
              id="eventPhoto"
              type="file"
              size="lg"
              color='white'
              placeholder="Seleccione una foto"
            />
          </div>
          <div className="flex space-x-4 justify-end Mobile-280:justify-center ">
            <Button ripple="light" className='bg-black Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Cancelar
            </Button>
            <Button ripple="light" className='bg-yellowCapas Mobile-280:w-24 Mobile-280:text-ButtonCarouselMobile-390*844'>
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </div>
        </div>
        </div>
    )
}

