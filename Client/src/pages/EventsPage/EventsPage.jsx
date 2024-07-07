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
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useUserContext } from '../../Context/userContext';
import { eventService } from '../../Services/eventService';
import { osrmService } from '../../Services/osrmService';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header/Header';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configurar iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/5307/5307184.png',
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const EventsPage = () => {
  const categories = ["Recomendados","Todos", "Cine", "Conciertos", "Obras de teatro", "Deportes"];
  const [selectedCategory, setSelectedCategory] = useState('Recomendados');

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [route, setRoute] = useState(null);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [events, setEvents] = useState({
    'Recomendados': [],
    'Todos':[],
    'Cine': [],
    'Conciertos': [],
    'Obras de teatro': [],
    'Deportes': []
  });

    // Componente para la geolocalización automática
    function LocationMarker() {
      const [position, setPosition] = useState(null);
      const map = useMapEvents({
        locationfound(e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        },
      });
  
      
  
      useEffect(() => {
        map.locate();
      }, [map]);
  
      return position === null ? null : (
        <Marker position={position} icon={userIcon}>
          <Popup>Usted está aquí</Popup>
        </Marker>
      );
    }

  
  const { user, token } = useUserContext();

  console.log('mi token es:', token);

  useEffect(() => {
    if (token) {
      eventService.getAllCurrentEvents(token)
        .then((data) => {
          setEvents(prevEvents => ({ ...prevEvents, Todos: data.content }));
          setCurrentEvents(data.content);
          console.log('Los eventos obtenidas:', events.Todos);
        })
        .catch((error) => {
          console.error('Hubo un error al obtener las eventos:', error);
        });
        eventService.getRecommendedEvents(token)
        .then((data) => {
          setEvents(prevEvents => ({ ...prevEvents, Recomendados: data }));
          setRecommendedEvents(data);
          console.log('Las recomendaciones obtenidas:', events.Recomendados);
        })
        .catch((error) => {
          console.error('Hubo un error al obtener las recomendaciones:', error);
        });
    }
  }, [token]);

  // Componente para la geolocalización automática
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    

    useEffect(() => {
      map.locate();
    }, [map]);

  
   

    return position === null ? null : (
      <Marker position={position} icon={userIcon}>
        <Popup>Usted está aquí</Popup>
      </Marker>
    )
  }

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('CINE', page, size, token)
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
  }, ['CINE', page, size, token]);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('MUSC', page, size, token)
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
  }, ['MUSC', page, size, token]);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('OBTR', page, size, token)
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
  }, ['OBTR', token]);

  useEffect(() => {
    if (token) {
      eventService.getEventsByCategory('DEPO', page, size, token)
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
  }, ['DEPO', token]);

  const navigate = useNavigate();

  const viewBuyTicketsHandler = (code) => {
    navigate(`/buytickets/${code}`);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const handlePlayClick = (demoLink) => {
    const videoId = demoLink.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    const embedLink = ampersandPosition !== -1 
      ? `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}` 
      : `https://www.youtube.com/embed/${videoId}`;
    setCurrentVideo(embedLink);
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

  async function handleRoutingEvent(event)  {
    // Logic for handling the event, e.g., routing
    setRoute(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const dataEnviada = {
            startLat: position.coords.latitude,
            startLon: position.coords.longitude,
            endLat: event.latlng.lat,
            endLon: event.latlng.lng
        
          };

          console.log('Data enviada:', dataEnviada);

          osrmService.getRouteData({
            startLat: position.coords.latitude,
            startLon: position.coords.longitude,
            endLat: event.latlng.lat,
            endLon: event.latlng.lng
        
          }).then((data) => {
            
            
            const routeData = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRoute(routeData);
          }).catch((error) => {
            console.error('Hubo un error al obtener la ruta:', error);
          });

          
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error);
        }
      );
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
    }

    


    /*osrmService.getRouteData({
        
    }).then((data) => {
      setRoute(data);
    }).catch((error) => {
      console.error('Hubo un error al obtener la ruta:', error);
    });*/
  };

  return (
    <>
      <Header darkMode={true} />      
      <div className={classes["eventsTitle"]}>
        <h1>Eventos cerca de ti</h1>
      </div>
      <div className="events-map-container m-4" style={{ position: 'relative', zIndex: 0 }}>
        <div style={{ height: '400px', width: '100%' }}>
          <MapContainer center={[13.672551566676361, -89.2995414024554]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
     
            <LocationMarker  />
           
            {currentEvents.map(event => (
              <Marker eventHandlers={{ click: (e) => handleRoutingEvent(e) }}  key={event.code} position={[event.eventLocation.latitude, event.eventLocation.longitude]}>
                <Popup>
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-xl'>{event.title}</h1>
                    <p className='text-md'>{event.date}</p>
                    <div className='w-36 h-30 flex items-center justify-center'>
                      <img
                        src={event.image}
                        alt='Imagen de evento'
                        className='rounded-md w-5/6 h-full object-cover'
                      />
                    </div>
                    <button 
                      onClick={() => navigate(`/buytickets/${event.code}`)}
                      className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150 mt-2"
                      style={{ fontFamily: "PoppinsLight" }}
                    >
                      Ver más
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {route && <Polyline positions={route} color="blue" />}
          </MapContainer>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-screen my-8 bg-dark-blue">
        <div className={classes["optionsContainer"]}>
        <ul>
        {categories.map(category => (
          <li className="mb-2 text-center" key={category}>
            <button 
              className={`mt-3 transition-all duration-150 rounded-md py-1 px-2 hover:bg-dark-blue active:scale-90 ${
                selectedCategory === category ? 'bg-dark-blue' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
          </button>
        </li>
      ))}
    </ul>
        </div>
        <div className="w-full bg-dark-blue sm:w-3/4 p-4 overflow-auto">
          <div className="flex p-0 flex-wrap sm:space-x-4 justify-center">
            {events[selectedCategory]?.map((event, index) => (
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
                <div className="flex flex-col items-center mt-2">
                <button
                  onClick={() => viewBuyTicketsHandler(event.code)}
                  className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                  style={{ fontFamily: "PoppinsLight" }}
                >Comprar boleto
                </button>

                <button
                  onClick={() => handlePlayClick(event.demo)}
                  className="flex flex-row bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 active:scale-90 transition-all duration-150 mt-2"
                  style={{ fontFamily: "PoppinsLight" }}
                >
                  Demo
                  <PlayIcon className="flex justify-center mx-auto h-6 w-6" />
                </button>
                </div>
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