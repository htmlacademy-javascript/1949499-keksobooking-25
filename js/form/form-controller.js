import {pristine} from './form-validator.js';

import { isEscapeKey } from '../util.js';

import { setAddress } from '../server-data.js';

const adForm = document.querySelector('.ad-form');

function unActiveBlock(form){
  const selector = `.${form}`;
  const parent = document.querySelector(selector);
  const childArr = Object.values(parent.children);
  parent.classList.add(`${form}--disabled`);
  childArr.forEach((child) => {
    child.classList.add('disabled');
  });
}

function activeBlock(form){
  const selector = `.${form}`;
  const parent = document.querySelector(selector);
  const childArr = Object.values(parent.children);
  parent.classList.remove(`${form}--disabled`);
  childArr.forEach((child) => {
    child.classList.remove('disabled');
  });
}

function unActivePage(){
  unActiveBlock('ad-form');
  unActiveBlock('map__filters');
}
function activePage(){
  activeBlock('ad-form');
  activeBlock('map__filters');
}

function closeSuccessMessage(evt){
  const successMessage = document.querySelector('.success');
  const body = document.querySelector('body');
  if(isEscapeKey(evt) || evt.target === successMessage){
    body.removeChild(successMessage);
    document.removeEventListener('keydown', closeSuccessMessage);
    window.removeEventListener('click', closeSuccessMessage);
  }
}

function closeErrorMessage(evt){
  const errorMessage = document.querySelector('.error');
  const messageButton = errorMessage.querySelector('.error__button');
  const body = document.querySelector('body');
  if(isEscapeKey(evt) || evt.target === errorMessage || evt.target === messageButton){
    body.removeChild(errorMessage);
    document.removeEventListener('keydown', closeErrorMessage);
    window.removeEventListener('click', closeErrorMessage);
  }
}

function openMessage(status){
  const messageTemplate = document.querySelector(`#${status}`);
  const message = messageTemplate.content.cloneNode(true);
  const body = document.querySelector('body');
  body.appendChild(message);
  if(status === 'success'){
    window.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', closeSuccessMessage);
  } else{
    window.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', closeErrorMessage);
  }
}

function giveFeedback(status){
  if(status === 'success'){
    adForm.reset();
    setAddress();
  }
  openMessage(status);
}
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__submit');

function blockSubmitButton(){
  submitButton.disabled = true;
}

function unblockSubmitButton(){
  submitButton.disabled = false;
}

function setFormSubmit(onResult){

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      fetch(
        'https://25.javascript.pages.academy/keksobooking',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then(() => {
          onResult('success');
          unblockSubmitButton();
        })
        .catch(() => {
          onResult('error');
          unblockSubmitButton();
        });
    }
  });
}

function clearForm(){
  adForm.reset();
  setAddress();
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});
setFormSubmit(giveFeedback);

export {activePage, unActivePage};
