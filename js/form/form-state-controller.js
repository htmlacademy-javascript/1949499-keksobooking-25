const unactivateForm = (form) => {
  const selector = `.${form}`;
  const parent = document.querySelector(selector);
  const children = Object.values(parent.children);
  parent.classList.add(`${form}--disabled`);
  children.forEach((child) => {
    child.classList.add('disabled');
  });
};

const activateForm = (form) => {
  const formNode = document.querySelector(`.${form}`);
  if (formNode.children[0].classList.contains('disabled')){
    const selector = `.${form}`;
    const parent = document.querySelector(selector);
    const children = Object.values(parent.children);
    parent.classList.remove(`${form}--disabled`);
    children.forEach((child) => {
      child.classList.remove('disabled');
    });
  }
};

const blockPage = () => {
  unactivateForm('ad-form');
  unactivateForm('map__filters');
};

const unblockAdForm = () => activateForm('ad-form');

const blockFilterForm = () => unactivateForm('map__filters');

const unblockFilterForm = () => activateForm('map__filters');

blockPage();

export {
  unblockAdForm,
  blockFilterForm,
  unblockFilterForm,
};
