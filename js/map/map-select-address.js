import { mainPinMarker, map, centerOfTokyo} from './map-render.js';

const adForm = document.querySelector('.ad-form');

function setAddress(){
  mainPinMarker.setLatLng(centerOfTokyo);
  const {lat, lng} = mainPinMarker.getLatLng();
  adForm.querySelector('#address').value = `${lat}, ${ lng}`;
  map.closePopup();
}

setAddress();

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  adForm.querySelector('#address').value = `${lat}, ${ lng}`;
});

export {map, setAddress};
