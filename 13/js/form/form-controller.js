import {
  isEscapeKey
} from '../util/util.js';

import {
  pristine
} from './validator/form-main-validator.js';

import {
  sliderElement
} from '../slider/slider.js';

import {
  sendData
} from '../api/api.js';

import {
  setAddress
} from '../map/map-select-address.js';

import '../util/time-changer.js';
import '../map/map-filter.js';
import './images/avatar-loader.js';
import './images/photo-loader.js';


const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const priceField = document.querySelector('#price');
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const successMessageCloseHandler = (evt) => {
  const successMessage = document.querySelector('.success');
  if (isEscapeKey(evt) || evt.target === successMessage) {
    body.removeChild(successMessage);
    document.removeEventListener('keydown', successMessageCloseHandler);
    window.removeEventListener('click', successMessageCloseHandler);
  }
};

const errorMessageCloseHandler = (evt) => {
  const errorMessage = document.querySelector('.error');
  const messageButton = errorMessage.querySelector('.error__button');
  if (isEscapeKey(evt) || evt.target === errorMessage || evt.target === messageButton) {
    body.removeChild(errorMessage);
    document.removeEventListener('keydown', errorMessageCloseHandler);
    window.removeEventListener('click', errorMessageCloseHandler);
  }
};

const openMessageHandler = (status) => {
  const messageTemplate = document.querySelector(`#${status}`);
  const message = messageTemplate.content.cloneNode(true);
  body.appendChild(message);
  if (status === 'success') {
    window.addEventListener('click', successMessageCloseHandler);
    document.addEventListener('keydown', successMessageCloseHandler);
  } else {
    window.addEventListener('click', errorMessageCloseHandler);
    document.addEventListener('keydown', errorMessageCloseHandler);
  }
};

const giveFeedback = (status) => {
  if (status === 'success') {
    adForm.reset();
    setAddress();
    priceField.value = 5000;
    sliderElement.noUiSlider.set(priceField.value);
  }
  openMessageHandler(status);
  unblockSubmitButton();
};


const setFormSubmit = (onResult) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(onResult, formData);
    }
  });
};


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  setAddress();
  priceField.value = 5000;
  sliderElement.noUiSlider.set(priceField.value);
});

setFormSubmit(giveFeedback);
