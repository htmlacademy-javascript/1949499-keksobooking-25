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

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__submit');

function closeSuccessMessage(evt) {
  const successMessage = document.querySelector('.success');
  const body = document.querySelector('body');
  if (isEscapeKey(evt) || evt.target === successMessage) {
    body.removeChild(successMessage);
    document.removeEventListener('keydown', closeSuccessMessage);
    window.removeEventListener('click', closeSuccessMessage);
  }
}

function closeErrorMessage(evt) {
  const errorMessage = document.querySelector('.error');
  const messageButton = errorMessage.querySelector('.error__button');
  const body = document.querySelector('body');
  if (isEscapeKey(evt) || evt.target === errorMessage || evt.target === messageButton) {
    body.removeChild(errorMessage);
    document.removeEventListener('keydown', closeErrorMessage);
    window.removeEventListener('click', closeErrorMessage);
  }
}

function openMessage(status) {
  const messageTemplate = document.querySelector(`#${status}`);
  const message = messageTemplate.content.cloneNode(true);
  const body = document.querySelector('body');
  body.appendChild(message);
  if (status === 'success') {
    window.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', closeSuccessMessage);
  } else {
    window.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', closeErrorMessage);
  }
}

function giveFeedback(status) {
  if (status === 'success') {
    const priceField = document.querySelector('#price');
    adForm.reset();
    setAddress();
    priceField.value = 5000;
    sliderElement.noUiSlider.set(priceField.value);
  }
  openMessage(status);
  unblockSubmitButton();
}

function blockSubmitButton() {
  submitButton.disabled = true;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
}

function setFormSubmit(onResult) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(onResult, formData);
    }
  });
}

resetButton.addEventListener('click', (evt) => {
  const priceField = document.querySelector('#price');
  evt.preventDefault();
  adForm.reset();
  setAddress();
  priceField.value = 5000;
  sliderElement.noUiSlider.set(priceField.value);
});

setFormSubmit(giveFeedback);
