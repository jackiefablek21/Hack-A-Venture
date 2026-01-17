import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 10.762622,
  lng: 106.660172,
};

export default function MapPage() {
    const keys = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    console.log(keys)
  return (
    <>
    <main>
        <LoadScript googleMapsApiKey={keys}>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >
            <Marker position={center} />
        </GoogleMap>
        </LoadScript>
    </main>
    </>
  );
}