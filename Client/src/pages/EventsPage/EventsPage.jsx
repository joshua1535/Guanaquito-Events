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
  Collapse,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';

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
  const { user, token } = useUserContext();

  console.log('mi token es:', token);

  useEffect(() => {
    if (token) {
      eventService.getAllCurrentEvents(token)
        .then((data) => {
          setEvents(prevEvents => ({ ...prevEvents, Todos: data.content }));
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
    if (token) {
      eventService.getEventsByCategory('CI', page, size, token)
        .then((data) => {
          if (data !== undefined) {
            setEvents(prevEvents => ({ ...prevEvents, Cine: data.content }));
            console.log('Los eventos cine obtenidas:', events.Cine);
          }
        })
        .catch((error) => {
          console.error('Hubo un error al obtener las eventos:', error);
        });
    }
  }, ['CI', page, size, token]);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('MU', page, size, token)
        .then((data) => {
          if (data !== undefined) {
            setEvents(prevEvents => ({ ...prevEvents, Conciertos: data.content }));
            console.log('Los eventos Conciertos obtenidas:', events.Conciertos);
          }
        })
        .catch((error) => {
          console.error('Hubo un error al obtener las eventos:', error);
        });
    }
  }, ['MU', page, size, token]);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('OB', page, size, token)
        .then((data) => {
          if (data !== undefined) {
            setEvents(prevEvents => ({ ...prevEvents, "Obras de teatro": data.content }));
            console.log('Los eventos teatro obtenidas:', events['Obras de teatro']);
          }
        })
        .catch((error) => {
          console.error('Hubo un error al obtener las eventos:', error);
        });
    }
  }, ['OB', token]);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('DE', page, size, token)
        .then((data) => {
          if (data !== undefined) {
            setEvents(prevEvents => ({ ...prevEvents, Deportes: data.content }));
            console.log('Los eventos teatro obtenidas:', events.Deportes);
          }
        })
        .catch((error) => {
          console.error('Hubo un error al obtener las eventos:', error);
        });
    }
  }, ['DE', token]);

  const navigate = useNavigate();

  const viewBuyTicketsHandler = (code) => {
    navigate(`/buytickets/${code}`);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const handlePlayClick = (demoLink) => {
    setCurrentVideo(demoLink);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentVideo("");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <Header darkMode={true} />
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
          <div className="flex p-0 flex-wrap sm:space-x-4 justify-center">
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
                  <div style={{ fontFamily: "PoppinsLight" }} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-black bg-opacity-70 text-Orange font-bold transition-all duration-300 hover:opacity-100">
                    <p className="text-xl">{event.title}</p>
                    <p className="text-lg">{event.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => viewBuyTicketsHandler(event.code)}
                  className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                  style={{ fontFamily: "PoppinsLight" }}
                >Comprar boleto
                </button>
                <button
                  onClick={() => handlePlayClick(event.demo)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:scale-90 transition-all duration-150 mt-2"
                >Play
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
{/*Muestra el video en una ventana de dialogo */}
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Video de Evento</DialogHeader>
        <DialogBody divider>
          <div className={classes["video-responsive"]}>
            <iframe
              width="560"
              height="315"
              src={currentVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleCloseDialog} color="red" ripple="light">
            Salir
          </Button>
        </DialogFooter>
      </Dialog>

      <Footer />
    </>
  );
};

export default EventsPage;