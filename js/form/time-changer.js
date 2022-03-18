const adForm = document.querySelector('.ad-form');

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

function changeTime(actual) {
  adForm.querySelector('#timein').value = actual;
  adForm.querySelector('#timeout').value = actual;
}

timeIn.addEventListener('change', () => {
  changeTime(timeIn.value);
});

timeOut.addEventListener('change', () => {
  changeTime(timeOut.value);
});
