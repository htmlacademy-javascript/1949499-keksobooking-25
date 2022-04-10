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
const preview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photo = document.querySelector('.ad-form__photo').querySelector('img');
const pristineError = document.querySelector('.ad-form__error');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const successMessageClickHandler = () => {
  const successMessage = document.querySelector('.success');
  body.removeChild(successMessage);
  document.removeEventListener('keydown', successMessageKeydownHandler);
  window.removeEventListener('click', successMessageClickHandler);
};

function successMessageKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    const successMessage = document.querySelector('.success');
    body.removeChild(successMessage);
    document.removeEventListener('keydown', successMessageKeydownHandler);
    window.removeEventListener('click', successMessageClickHandler);
  }
}

const errorMessageClickHandler = () => {
  const errorMessage = document.querySelector('.error');
  body.removeChild(errorMessage);
  document.removeEventListener('keydown', errorMessageKeydownHandler);
  window.removeEventListener('click', errorMessageClickHandler);
};

function errorMessageKeydownHandler(evt) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(evt)) {
    body.removeChild(errorMessage);
    document.removeEventListener('keydown', errorMessageKeydownHandler);
    window.removeEventListener('click', errorMessageClickHandler);
  }
}

const openMessageHandler = (status) => {
  const messageTemplate = document.querySelector(`#${status}`);
  const message = messageTemplate.content.cloneNode(true);
  body.appendChild(message);
  if (status === 'success') {
    window.addEventListener('click', successMessageClickHandler);
    document.addEventListener('keydown', successMessageKeydownHandler);
  } else {
    window.addEventListener('click', errorMessageClickHandler);
    document.addEventListener('keydown', errorMessageKeydownHandler);
  }
};

const resetPrice = () => {
  priceField.value = 5000;
  sliderElement.noUiSlider.set(priceField.value);
};

const clearPhotos = () => {
  preview.src = 'img/muffin-grey.svg';
  photo.src = '';
};

const giveFeedback = (status) => {
  if (status === 'success') {
    adForm.reset();
    setAddress();
    resetPrice();
    clearPhotos();
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
  resetPrice();
  clearPhotos();
});

setFormSubmit(giveFeedback);
pristineError.parentNode.removeChild(pristineError);
