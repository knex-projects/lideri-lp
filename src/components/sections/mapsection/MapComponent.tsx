"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import mapPin from "@/public/assets/icon/pin1.svg"
import Image from "next/image";

const customDivIcon = L.divIcon({
  html: renderToString(
    <div className="text-N1">
      <Image src={mapPin} alt="Map Pin" width={32} height={32} />
    </div>
  ),
  className: 'bg-transparent border-none',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface contryLead {
  id: number;
  pais: string;
  coords: [number, number];
  leads: number;
}

export default function MapComponent() {
  const countryLeads: contryLead[] = [
    { id: 1, pais: "Alemanha", coords: [52.5200, 13.4050], leads: 190 },
    { id: 2, pais: "Angola", coords: [-8.8383, 13.2344], leads: 0 },
    { id: 3, pais: "Arábia Saudita", coords: [24.7136, 46.6753], leads: 0 },
    { id: 4, pais: "Argentina", coords: [-34.6037, -58.3816], leads: 0 },
    { id: 5, pais: "Austrália", coords: [-35.2809, 149.1300], leads: 0 },
    { id: 6, pais: "Bélgica", coords: [50.8503, 4.3517], leads: 0 },
    { id: 7, pais: "Bolívia", coords: [-16.5000, -68.1500], leads: 0 },
    { id: 8, pais: "Canadá", coords: [45.4215, -75.6972], leads: 200 },
    { id: 9, pais: "Chile", coords: [-33.4489, -70.6693], leads: 118 },
    { id: 10, pais: "China", coords: [39.9042, 116.4074], leads: 0 },
    { id: 11, pais: "Cingapura", coords: [1.3521, 103.8198], leads: 0 },
    { id: 12, pais: "Colômbia", coords: [4.7110, -74.0721], leads: 0 },
    { id: 13, pais: "Cuba", coords: [23.1291, -82.3794], leads: 0 },
    { id: 14, pais: "Egito", coords: [30.0444, 31.2357], leads: 0 },
    { id: 15, pais: "Emirados Árabes Unidos", coords: [24.4539, 54.3773], leads: 0 },
    { id: 16, pais: "Equador", coords: [-0.2299, -78.5249], leads: 0 },
    { id: 17, pais: "Espanha", coords: [40.4168, -3.7038], leads: 0 },
    { id: 18, pais: "Estônia", coords: [59.4370, 24.7536], leads: 0 },
    { id: 19, pais: "EUA", coords: [38.9072, -77.0369], leads: 390 },
    { id: 20, pais: "França", coords: [48.8566, 2.3522], leads: 130 },
    { id: 21, pais: "Grécia", coords: [37.9838, 23.7275], leads: 0 },
    { id: 22, pais: "Guiana", coords: [6.8013, -58.1551], leads: 0 },
    { id: 23, pais: "Guiana Francesa", coords: [4.9342, -52.3260], leads: 0 },
    { id: 24, pais: "Holanda", coords: [52.3676, 4.9041], leads: 0 },
    { id: 25, pais: "Indonésia", coords: [-6.2088, 106.8456], leads: 0 },
    { id: 26, pais: "Israel", coords: [31.7683, 35.2137], leads: 0 },
    { id: 27, pais: "Itália", coords: [41.9028, 12.4964], leads: 0 },
    { id: 28, pais: "Japão", coords: [35.6762, 139.6503], leads: 70 },
    { id: 29, pais: "Kuwait", coords: [29.3759, 47.9774], leads: 0 },
    { id: 30, pais: "México", coords: [19.4326, -99.1332], leads: 0 },
    { id: 31, pais: "Paraguai", coords: [-25.2637, -57.5759], leads: 135 },
    { id: 32, pais: "Peru", coords: [-12.0464, -77.0428], leads: 0 },
    { id: 33, pais: "Polônia", coords: [52.2297, 21.0122], leads: 0 },
    { id: 34, pais: "Porto Rico", coords: [18.3666, -66.1193], leads: 0 },
    { id: 35, pais: "Portugal", coords: [38.7223, -9.1393], leads: 260 },
    { id: 36, pais: "Reino Unido", coords: [51.5074, -0.1278], leads: 0 },
    { id: 37, pais: "Uruguai", coords: [-34.9011, -56.1645], leads: 215 },
    { id: 38, pais: "Venezuela", coords: [10.4806, -66.9036], leads: 0 },
    { id: 39, pais: "Vietnã", coords: [21.0285, 105.8542], leads: 0 }
  ];
  return (
    <MapContainer
      key={new Date().getTime()}
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countryLeads.map((item) => (
        <Marker key={item.id} position={item.coords} icon={customDivIcon}>
          <Popup className="w-52  ">
            <div className="rounded-3xl text-white "> ferro </div>
            <strong className="">{item.pais}</strong> <br />
            {item.leads > 0 ? `${item.leads} Leads gerados` : "Presença confirmada"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}