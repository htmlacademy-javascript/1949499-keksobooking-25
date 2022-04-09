import {
  centerOfTokyo,
  mainPinMarker,
  map,
} from './map-render.js';

const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');

const setAddress = () => {
  mainPinMarker.setLatLng(centerOfTokyo);
  const {
    lat,
    lng
  } = mainPinMarker.getLatLng();
  address.value = `${lat}, ${lng}`;
  map.closePopup();
};

mainPinMarker.on('moveend', (evt) => {
  const {
    lat,
    lng
  } = evt.target.getLatLng();
  address.value = `${lat}, ${lng}`;
});

setAddress();

export {
  map,
  setAddress,
};
