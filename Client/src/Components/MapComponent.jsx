import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import wellknown from 'wellknown';
import { Button } from '@material-tailwind/react';

// Fix default icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icono personalizado para la ubicación del usuario
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.freepik.com/512/5307/5307184.png', // Reemplaza con la URL de tu icono
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Icono personalizado para los lugares
const placeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/988/988557.png', // Reemplaza con la URL de tu icono
  iconSize: [40, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Ejemplo de lugares con geometrías en formato WKT
const places = [
  { 
    name: 'Estadio Mágico González', 
    lat: 13.697223, 
    lng: -89.191432,
    geometry: 'POLYGON((-89.192132 13.697623, -89.191732 13.697823, -89.191332 13.697423, -89.191932 13.697223, -89.192132 13.697623))'
  },
  { 
    name: 'Estadio Cuscatlán', 
    lat: 13.674268, 
    lng: -89.242654,
    geometry: 'POLYGON((-89.243254 13.674668, -89.242854 13.674868, -89.242454 13.674468, -89.243054 13.674268, -89.243254 13.674668))'
  },
  // Agrega más lugares con geometrías aquí
];

// Si la geolocalización no está disponible, se usa la posición predeterminada
const defaultPosition = { lat: 13.697223, lng: -89.191432 }; // Estadio Mágico González

const OpenPopupOnLoad = ({ children }) => {
  const map = useMap();

  useEffect(() => {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        layer.openPopup();
      }
    });
  }, [map]);

  return <>{children}</>;
};

const MapComponent = () => {
  const [position, setPosition] = useState(defaultPosition);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => {
          console.log('Location access denied. Using default location.');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser. Using default location.');
    }
  }, []);

  const handleSelectPlace = (lat, lng) => {
    setSelectedCoordinates({ lat, lng });
    alert(`Lugar seleccionado: Latitud ${lat}, Longitud ${lng}`);
  };

  return (
    <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <OpenPopupOnLoad>
        {places.map((place, idx) => (
          <React.Fragment key={idx}>
            <Marker position={[place.lat, place.lng]} icon={placeIcon} >
              <Popup>
                <div className='flex flex-col justify-center mt-4 py-0 text-md font-display font-semibold'>
                  {place.name}<br />
                  <Button color="blue" className='flex mx-auto my-4 justify-center p-2' onClick={() => handleSelectPlace(place.lat, place.lng)}>Seleccionar</Button>
                </div>
              </Popup>
            </Marker>
            {place.geometry && (
              <Polygon positions={wellknown(place.geometry).coordinates[0].map(coord => [coord[1], coord[0]])} />
            )}
          </React.Fragment>
        ))}
        <Marker position={[position.lat, position.lng]} icon={userIcon}>
          <Popup>
          <div className='flex flex-col justify-center mt-4 py-0 text-md font-display font-semibold'>
              {position.lat === defaultPosition.lat && position.lng === defaultPosition.lng 
                ? 'Estadio Mágico González' 
                : 'Ubicación aproximada de la persona'}
            </div>
          </Popup>
        </Marker>
      </OpenPopupOnLoad>
    </MapContainer>
  );
}

export default MapComponent;