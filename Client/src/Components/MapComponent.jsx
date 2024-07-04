import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import wellknown from 'wellknown';
import { Button } from '@material-tailwind/react';
import { useUserContext } from '../Context/userContext';
import { eventLocationService } from '../Services/eventLocationService';

// Fix default icon issue with Webpack
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

const placeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/988/988557.png',
  iconSize: [40, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const defaultPosition = { lat: 13.697223, lng: -89.191432 };

const MapComponent = ({ onSelectPlace }) => {
  const [position, setPosition] = useState(defaultPosition);
  const [places, setPlaces] = useState([]);
  const { token } = useUserContext();

  useEffect(() => {
    if (token) {
      const getLocations = async () => {
        const places = await eventLocationService.getAllLocations(token);
        console.log(places);
        setPlaces(places);
      }
      getLocations();
    }
  }, [token]);

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

  const handleSelectPlace = (place) => {
    onSelectPlace(place);
  };

  return (
    <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        {places.map((place, idx) => (
          <React.Fragment key={idx}>
            <Marker position={[place.latitude, place.longitude]} icon={placeIcon} >
              <Popup>
                <div className='flex flex-col justify-center mt-4 py-0 text-md font-display font-semibold'>
                  {place.name}<br />
                  <Button color="blue" className='flex mx-auto my-4 justify-center p-2' onClick={() => 
                    handleSelectPlace(place)}>Seleccionar</Button>
                </div>
              </Popup>
            </Marker>
            {place.geometry && (
              wellknown(place.geometry).coordinates.map((polygon, polyIdx) => (
                <Polygon key={polyIdx} positions={polygon[0].map(coord => [coord[1], coord[0]])} />
              ))
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
    </MapContainer>
  );
}

export default MapComponent;
