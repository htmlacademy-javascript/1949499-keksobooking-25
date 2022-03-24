import '../../pristine/pristine.min.js';

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

function validateTitle(value) {
  return value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;
}

pristine.addValidator(
  title,
  validateTitle,
  `От ${MIN_LENGTH} до ${MAX_LENGTH} символов`
);

title.addEventListener('change', () => {
  pristine.validate();
});

export {
  validateTitle,
  MIN_LENGTH,
  MAX_LENGTH,
};
