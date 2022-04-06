import {
  centerOfTokyo,
  mainPinMarker,
  map,
} from './map-render.js';

const adForm = document.querySelector('.ad-form');

function setAddress() {
  mainPinMarker.setLatLng(centerOfTokyo);
  const {
    lat,
    lng
  } = mainPinMarker.getLatLng();
  adForm.querySelector('#address').value = `${lat}, ${lng}`;
  map.closePopup();
}

mainPinMarker.on('moveend', (evt) => {
  const {
    lat,
    lng
  } = evt.target.getLatLng();
  adForm.querySelector('#address').value = `${lat}, ${lng}`;
});

setAddress();

export {
  map,
  setAddress
};
