import {
  getData
} from '../api/api.js';

import {
  unblockFilterForm,
  blockFilterForm,
} from '../form/form-state-controller.js';

import {
  showPopups
} from './map-popup-render.js';

import {
  debounce
} from '../util/util.js';

const MAX_OFFERS = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const body = document.querySelector('body');
const errorMessageTemplate = body.querySelector('#data-error').content.cloneNode(true);
const filterForm = document.querySelector('.map__filters');
const priceField = filterForm.querySelector('#housing-price');
const typeField = filterForm.querySelector('#housing-type');
const roomsField = filterForm.querySelector('#housing-rooms');
const guestsField = filterForm.querySelector('#housing-guests');
const featureCheckboxes = filterForm.querySelectorAll('input[type=checkbox]');

const filterPrice = (data) => {
  const priceInput = priceField.value;

  switch (priceInput) {
    case 'middle':
      return (data >= LOW_PRICE && data <= HIGH_PRICE);
    case 'low':
      return (data < LOW_PRICE);
    case 'high':
      return (data > HIGH_PRICE);
    default:
      return true;
  }
};

const getFeatures = () => {
  const checkedFeatures = [];
  featureCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedFeatures.push(checkbox.value);
    }
  });
  return checkedFeatures;
};

const filterFeatures = (dataFeatures, inputFeatures) => {
  for (let i = 0; i < inputFeatures.length - 1; i++) {
    if (dataFeatures.indexOf(inputFeatures[i]) === -1) {
      return false;
    }
  }
  return true;
};

const filterData = (data) => {
  const typeInput = typeField.value;
  const priceInput = priceField.value;
  const roomsInput = roomsField.value;
  const guestsInput = guestsField.value;
  const featuresInput = getFeatures();

  let filteredData = Array.from(data);

  if (typeInput !== 'any') {
    filteredData = filteredData.filter((dataElement) => dataElement.offer.type === typeInput);
  }

  if (priceInput !== 'any') {
    filteredData = filteredData.filter((dataElement) => filterPrice(dataElement.offer.price));
  }

  if (roomsInput !== 'any') {
    filteredData = filteredData.filter((dataElement) => dataElement.offer.rooms === Number(roomsInput));
  }

  if (guestsInput !== 'any') {
    filteredData = filteredData.filter((dataElement) => dataElement.offer.guests === Number(guestsInput));
  }

  if (featuresInput.length !== 0) {
    filteredData = filteredData.filter((dataElement) => {
      if (dataElement.offer.features) {
        return filterFeatures(dataElement.offer.features, featuresInput);
      }
      return false;
    });
  }
  return filteredData;
};

const showOffers = (data) => {
  unblockFilterForm();
  const offers = filterData(data).slice(0, MAX_OFFERS);
  showPopups(offers);
};

const showError = () => {
  filterForm.removeEventListener('change', addChangeHandler);
  blockFilterForm();
  body.appendChild(errorMessageTemplate);
  const errorMessage = body.querySelector('.data-error');
  setTimeout(() => {
    body.removeChild(errorMessage);
  }, 5000);
};

const getDataDebounced = debounce(getData, 500);

function addChangeHandler() {
  getDataDebounced(showOffers, showError);
}

filterForm.addEventListener('change', addChangeHandler);

getData(showOffers, showError);
