import {activePage, unActivePage} from '../form/form-controller.js';

const centerOfTokyo = L.latLng(35.681729, 139.753927);

unActivePage();
const map = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  centerOfTokyo,
  {
    draggable: true,
    icon: mainPinIcon,
  }
).addTo(map);

export {mainPinMarker, map, centerOfTokyo};
