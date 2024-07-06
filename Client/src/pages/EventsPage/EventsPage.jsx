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

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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
  const categories = ["Todos", "Cine", "Conciertos", "Obras de teatro", "Deportes"];
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const [events, setEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const { user, token } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      eventService.getAllCurrentEvents(token)
        .then((data) => {
          setEvents(data.content);
        })
        .catch((error) => {
          console.error('Hubo un error al obtener los eventos:', error);
        });

      eventService.getRecommendedEvents(token)
        .then((data) => {
          setRecommendedEvents(data);
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
    );
  }

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
           
            {events.map(event => (
              <Marker key={event.code} position={[event.eventLocation.latitude, event.eventLocation.longitude]}>
                <Popup>
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold mt-2 text-xl'>{event.title}</h1>
                    <p className='mt-2 text-md'>{event.date}</p>
                    <div className='w-40 h-40 flex items-center justify-center'>
                      <img
                        src={event.image}
                        alt='Imagen de evento'
                        style={{ height: '100%', width: '100%' }}
                        className='rounded-md'
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
          </MapContainer>
        </div>
      </div>

      <div className={classes["eventsTitleList"]}>
        <h1>Nuestras recomendaciones para ti</h1>
      </div>
      <div className="flex justify-center sm:flex-row h-screen bg-dark-blue mt-1 mb-2">
        
        <div className="w-full bg-dark-blue sm:w-3/4 p-4 ">
          <div className="flex p-0 flex-wrap sm:space-x-4 justify-center">
            {events.filter(event => selectedCategory === "Todos" || event.category.code === selectedCategory).map((event, index) => (
              <div className="p-4 rounded-lg m-2 sm:m-0" key={index}>
                <div className="w-40 h-56 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt="Imagen de evento"
                    className="w-full h-full object-cover mb-2 rounded transform transition-all duration-300 hover:opacity-5"
                  />
                  <div style={{ fontFamily: "PoppinsLight" }} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-black bg-opacity-70 text-Orange font-bold transition-all duration-300 hover:opacity-100">
                    <p className="text-xl">{event.title}</p>
                    <p className="text-lg">{event.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/buytickets/${event.code}`)}
                  className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                  style={{ fontFamily: "PoppinsLight" }}
                >
                  Comprar boleto
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes["eventsTitleList"]}>
        <h1>Eventos disponibles</h1>
      </div>
      <div className="flex flex-col sm:flex-row h-screen bg-dark-blue mt-1">
        <div className={classes["optionsContainer"]}>
          <ul>
            {categories.map(category => (
              <li className="mb-2 text-center" key={category}>
                <button
                  className="mt-3 hover:bg-dark-blue active:scale-90 transition-all duration-150 rounded-md py-1 px-2"
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
            {events.filter(event => selectedCategory === "Todos" || event.category.code === selectedCategory).map((event, index) => (
              <div className="p-4 rounded-lg m-2 sm:m-0" key={index}>
                <div className="w-40 h-56 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt="Imagen de evento"
                    className="w-full h-full object-cover mb-2 rounded transform transition-all duration-300 hover:opacity-5"
                  />
                  <div style={{ fontFamily: "PoppinsLight" }} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-black bg-opacity-70 text-Orange font-bold transition-all duration-300 hover:opacity-100">
                    <p className="text-xl">{event.title}</p>
                    <p className="text-lg">{event.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/buytickets/${event.code}`)}
                  className="bg-Orange text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-dark-blue active:scale-90 transition-all duration-150"
                  style={{ fontFamily: "PoppinsLight" }}
                >
                  Comprar boleto
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
