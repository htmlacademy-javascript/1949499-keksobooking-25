import '../../../../pristine/pristine.min.js';

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const validateTitle = (value) => value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;

pristine.addValidator(
  title,
  validateTitle,
  `От ${MIN_LENGTH} до ${MAX_LENGTH} символов`
);

title.addEventListener('change', () => pristine.validate());

export {
  validateTitle,
  MIN_LENGTH,
  MAX_LENGTH,
};
