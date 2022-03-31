import {createMarker, setAddress,} from './map/map-popup-render.js';

const body = document.querySelector('body');
const errorMessageTemplate = body.querySelector('#data-error').content.cloneNode(true);

function showError(){
  body.appendChild(errorMessageTemplate);
  const errorMessage = body.querySelector('.data-error');
  setTimeout(() => {
    body.removeChild(errorMessage);
  }, 5000);
}

fetch('https://25.javascript.pag es.academy/keksobooking/data')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      createMarker(element);
    });
  })
  .catch(showError);

export {setAddress};
