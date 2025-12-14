import Map, { Marker, NavigationControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function ContactMap() {
  const branchOffices = [
    { city: 'Dhaka HQ', lat: 23.7806, lng: 90.2794 },
    { city: "Cox's Bazar Office", lat: 21.4272, lng: 92.0058 },
    { city: 'Sylhet Office', lat: 24.8949, lng: 91.8687 },
    { city: 'Chittagong Office', lat: 22.3569, lng: 91.7832 },
  ];

  return (
    <div className="h-96 w-full">
      <Map
        initialViewState={{
          latitude: 23.7806,
          longitude: 90.2794,
          zoom: 5,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoibWhtaXphbiIsImEiOiJjbWhmd215bmUwOHp5MmpxdDU5OW1yM3J2In0.Yuv4YfCgxzpgk0X5dwvwrg"
      >
        <NavigationControl position="top-right" />

        {branchOffices.map((office, idx) => (
          <Marker
            key={idx}
            latitude={office.lat}
            longitude={office.lng}
            anchor="bottom"
          >
            <MapPin className="h-6 w-6 text-emerald-600 font-bold" />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
