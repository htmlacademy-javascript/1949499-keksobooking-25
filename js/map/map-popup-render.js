import {
  createOffer
} from '../util/markup-generator.js';

import {
  map
} from './map-select-address.js';

const cardTemplate = document.querySelector('#card');

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
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
};

const showPopups = (popups) => {
  markerGroup.clearLayers();
  popups.forEach((popup) => createMarker(popup));
};

export {
  showPopups,
  map,
};
