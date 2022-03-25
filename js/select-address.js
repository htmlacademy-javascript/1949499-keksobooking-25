import { mainPinMarker, map } from './map/map-render.js';

const adForm = document.querySelector('.ad-form');

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  adForm.querySelector('#address').value = `${lat}, ${ lng}`;
});

export {map};
