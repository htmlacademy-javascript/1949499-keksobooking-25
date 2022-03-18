import '../../pristine/pristine.min.js';

const adForm = document.querySelector('.ad-form');
const guestsCount = adForm.querySelector('#capacity');
const roomsCount = adForm.querySelector('#room_number');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

function getMaxGuests(value) {
  if (value > 3) {
    return 0;
  }
  return value;
}

function validateGuests(value) {
  const max = getMaxGuests(roomsCount.value);
  if (max === 0 || Number(value) === 0) {
    return max === Number(value);
  }
  return max >= value && value !== 0;
}

pristine.addValidator(
  guestsCount,
  validateGuests,
  'Неверное число гостей'
);

guestsCount.addEventListener('change', () => {
  pristine.validate();
});

roomsCount.addEventListener('change', () => {
  pristine.validate();
});

export {
  validateGuests
};
