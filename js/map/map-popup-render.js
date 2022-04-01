import {
  map, setAddress
} from './map-select-address.js';

import {
  createOffer
} from '../markup-generator.js';

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

function createMarker(offer) {
  const cardTemplate = document.querySelector('#card');
  const point = createOffer(offer, cardTemplate);
  const marker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng,
  }, {
    icon: pinIcon,
  }, );
  marker
    .addTo(markerGroup)
    .bindPopup(point.querySelector('.popup'));
}

export {createMarker, setAddress};
