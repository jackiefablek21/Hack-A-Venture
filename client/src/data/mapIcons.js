import L from "leaflet";

const baseIcon = {
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};

export const rmitIcon = L.icon({
  iconUrl: "/assets/rmit-logo.jpg",
  iconSize: [60, 40],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

export const greenIcon = new L.Icon({
  ...baseIcon,
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const yellowIcon = new L.Icon({
  ...baseIcon,
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const redIcon = new L.Icon({
  ...baseIcon,
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});