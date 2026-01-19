import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import vietnamGeoJSON from "../data/vietnam-provinces.json";
import { Link, useNavigate } from "react-router";
import "../styles/map.css"

export default function MapPage() {
  const sensors = [
    { id: 1, lat: 10.79048681125462, lng: 106.68138665565148 },
    { id: 2, lat: 10.750082395708914, lng: 106.670648591217 },
    { id: 3, lat: 10.72903454160983, lng: 106.6321926919572 },
    { id: 4, lat: 10.73594215127016, lng: 106.64409268509549 },
    { id: 5, lat: 10.884166660501778, lng: 106.72325448727261 },
    { id: 6, lat: 10.853192951424703, lng: 106.68026992686303 },
    { id: 7, lat: 10.813514184866934, lng: 106.77954617021044 },
    { id: 8, lat: 11.144041750072978, lng: 106.50779878338162 },
    { id: 9, lat: 10.734233609546372, lng: 106.69429125366091 },
  ];

  vietnamGeoJSON.features.forEach(f => {
    console.log(`${f.properties.ISO3166_2_CODE} - ${f.properties.Name_EN}` )
  })
  
  return (
    <main className="map-wrapper">
      <div className="map-container">
        <MapContainer
        center={[10.798706817357974, 106.69496147238262]}
        zoom={12}
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

        {sensors.map(sensor => (
          <Marker
            key={sensor.id}
            position={[sensor.lat, sensor.lng]}
          >
            <Popup>
              Sensor #{sensor.id}
            </Popup>
          </Marker>
        ))}
        
      </MapContainer>
      </div>
    </main>
  );
}