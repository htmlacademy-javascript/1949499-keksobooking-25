const unActivateForm = (form) => {
  const selector = `.${form}`;
  const parent = document.querySelector(selector);
  const childArr = Object.values(parent.children);
  parent.classList.add(`${form}--disabled`);
  childArr.forEach((child) => {
    child.classList.add('disabled');
  });
};

const activateForm = (form) => {
  const formNode = document.querySelector(`.${form}`);
  if (formNode.children[0].classList.contains('disabled')){
    const selector = `.${form}`;
    const parent = document.querySelector(selector);
    const childArr = Object.values(parent.children);
    parent.classList.remove(`${form}--disabled`);
    childArr.forEach((child) => {
      child.classList.remove('disabled');
    });
  }
};

const blockPage = () => {
  unActivateForm('ad-form');
  unActivateForm('map__filters');
};

const unblockAdForm = () => activateForm('ad-form');

const blockFilterForm = () => unActivateForm('map__filters');

const unblockFilterForm = () => activateForm('map__filters');

blockPage();

export {
  unblockAdForm,
  blockFilterForm,
  unblockFilterForm,
};
