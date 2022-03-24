import {
  map
} from '../select-address.js';

import {
  getRentOffers
} from '../data.js';

import {
  createOffers
} from '../markup-generator.js';

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const cardTemplate = document.querySelector('#card');
const offers = getRentOffers(10);
const points = createOffers(offers, cardTemplate);

const markerGroup = L.layerGroup().addTo(map);


function createMarker(point, i) {
  const marker = L.marker({
    lat: offers[i].location.lat,
    lng: offers[i].location.lng,
  }, {
    icon: pinIcon,
  }, );
  marker
    .addTo(markerGroup)
    .bindPopup(point.querySelector('.popup'));
}

points.forEach((element, i) => {
  createMarker(element, i);
});

