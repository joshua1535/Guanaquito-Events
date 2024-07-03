import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Lista de lugares para eventos en El Salvador
const places = [
  { 
    name: 'Estadio Mágico González', 
    lat: 13.697223, 
    lng: -89.191432,
    geometry: [
      [13.697623, -89.192132],
      [13.697823, -89.191732],
      [13.697423, -89.191332],
      [13.697223, -89.191932],
    ]
  },
  { 
    name: 'Estadio Cuscatlán', 
    lat: 13.674268, 
    lng: -89.242654,
    geometry: [
      [13.674668, -89.243254],
      [13.674868, -89.242854],
      [13.674468, -89.242454],
      [13.674268, -89.243054],
    ]
  },
  { 
    name: 'Teatro Nacional de El Salvador', 
    lat: 13.69893, 
    lng: -89.190186,
    geometry: [
      [13.69933, -89.190786],
      [13.69953, -89.190386],
      [13.69913, -89.189986],
      [13.69893, -89.190586],
    ]
  },
  { 
    name: 'Centro Internacional de Ferias y Convenciones', 
    lat: 13.705063, 
    lng: -89.227483,
    geometry: [
      [13.705463, -89.228083],
      [13.705663, -89.227683],
      [13.705263, -89.227283],
      [13.705063, -89.227883],
    ]
  },
  { 
    name: 'Plaza Libertad', 
    lat: 13.699515, 
    lng: -89.191243,
    geometry: [
      [13.699915, -89.191843],
      [13.700115, -89.191443],
      [13.699715, -89.191043],
      [13.699515, -89.191643],
    ]
  },
  { 
    name: 'Museo de Arte de El Salvador', 
    lat: 13.696124, 
    lng: -89.236862,
    geometry: [
      [13.696524, -89.237462],
      [13.696724, -89.237062],
      [13.696324, -89.236662],
      [13.696124, -89.237262],
    ]
  },
  { 
    name: 'Parque Cuscatlán', 
    lat: 13.698793, 
    lng: -89.20144,
    geometry: [
      [13.699193, -89.20204],
      [13.699393, -89.20164],
      [13.698993, -89.20124],
      [13.698793, -89.20184],
    ]
  },
  { 
    name: 'Auditorio FEPADE', 
    lat: 13.700743, 
    lng: -89.233579,
    geometry: [
      [13.701143, -89.234179],
      [13.701343, -89.233779],
      [13.700943, -89.233379],
      [13.700743, -89.233979],
    ]
  },
  { 
    name: 'Polideportivo de Ciudad Merliot', 
    lat: 13.673217, 
    lng: -89.254417,
    geometry: [
      [13.673617, -89.255017],
      [13.673817, -89.254617],
      [13.673417, -89.254217],
      [13.673217, -89.254817],
    ]
  },
  { 
    name: 'Centro Comercial Multiplaza', 
    lat: 13.675354, 
    lng: -89.240104,
    geometry: [
      [13.675754, -89.240704],
      [13.675954, -89.240304],
      [13.675554, -89.239904],
      [13.675354, -89.240504],
    ]
  }
];

// Si la geolocalización no está disponible, se usa la posición predeterminada
const defaultPosition = { lat: 13.697223, lng: -89.191432 }; // Estadio Mágico González

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
      {places.map((place, idx) => (
        <React.Fragment key={idx}>
          <Marker position={[place.lat, place.lng]}>
            <Popup>
              {place.name}<br />
              <button onClick={() => handleSelectPlace(place.lat, place.lng)}>Seleccionar</button>
            </Popup>
          </Marker>
          {place.geometry && (
            <Polygon positions={place.geometry} />
          )}
        </React.Fragment>
      ))}
      <Marker position={[position.lat, position.lng]}>
        <Popup>
          {position.lat === defaultPosition.lat && position.lng === defaultPosition.lng 
            ? 'Estadio Mágico González' 
            : 'Ubicación aproximada de la persona'}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;


