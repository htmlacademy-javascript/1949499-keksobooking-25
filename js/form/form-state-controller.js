function unActivateForm(form) {
  const selector = `.${form}`;
  const parent = document.querySelector(selector);
  const childArr = Object.values(parent.children);
  parent.classList.add(`${form}--disabled`);
  childArr.forEach((child) => {
    child.classList.add('disabled');
  });
}

function activateForm(form) {
  const selector = `.${form}`;
  const parent = document.querySelector(selector);
  const childArr = Object.values(parent.children);
  parent.classList.remove(`${form}--disabled`);
  childArr.forEach((child) => {
    child.classList.remove('disabled');
  });
}

function blockPage() {
  unActivateForm('ad-form');
  unActivateForm('map__filters');
}

function unblockAdForm() {
  activateForm('ad-form');
}

function unblockFilterForm() {
  activateForm('map__filters');
}

blockPage();

export {
  unblockAdForm,
  unblockFilterForm
};
