import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import vietnamGeoJSON from "../data/vietnam-provinces.json";
import { Link, useNavigate } from "react-router";
import "../styles/map.css"

export default function MapPage() {
  const data = [
    {
      deviceId: "water-node-11",
      location: {
        lat: 10.762622,
        lng: 106.660172
      },
      timestamp: "2026-01-12T13:45:30Z",
      metrics: {
        ph: 7.2,
        turbidity: 3.8,
        waterLevel: 1.45,
        temperature: 26.9,
        do: 67,
        tds: 69,
      },
      status: "normal",
      mission: {
        id: '001',
        title:"clean up your trash",
        reward: 50,
      },
    },
  ] 
  
  const navigate = useNavigate()

  console.log(data)
  
  return (
    <main className="map-wrapper">
      <div className="map-container">
        <MapContainer
        center={[10.798706817357974, 106.69496147238262]}
        zoom={20}
        style={{ height: "80vh"  ,   borderRadius: "1rem" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <GeoJSON
          data={vietnamGeoJSON}
          style={{
            color: "#0F3663",
            weight: 1,
            fillColor: "none",
            fillOpacity: 0.2,
          }}
        />
        <Marker position={[10.79048681125462, 106.68138665565148]}/>
        <Marker position={[10.750082395708914, 106.670648591217]}/>
        <Marker position={[10.72903454160983, 106.6321926919572]}/>
        <Marker position={[10.73594215127016, 106.64409268509549]}/>
        <Marker position={[10.884166660501778, 106.72325448727261]}/>
        <Marker position={[10.853192951424703, 106.68026992686303]}/>
        <Marker position={[10.813514184866934, 106.77954617021044]}/>
        <Marker position={[11.144041750072978, 106.50779878338162]}/>
        <Marker position={[10.734233609546372, 106.69429125366091]}/>

      </MapContainer>
      </div>
    </main>
  );
}