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
  const NOT_FOR_GUESTS = 0;
  const MAX_COUNT_GUESTS = 3;
  if (value > MAX_COUNT_GUESTS) {
    return NOT_FOR_GUESTS;
  }
  return value;
}

function validateGuests(value) {
  const max = getMaxGuests(roomsCount.value);
  const NOT_FOR_GUESTS = 0;
  if (max === NOT_FOR_GUESTS || Number(value) === NOT_FOR_GUESTS) {
    return max === Number(value);
  }
  return max >= value && value !== NOT_FOR_GUESTS;
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
