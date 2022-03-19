import './form-validator.js';

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

export { unActivePage, activePage};
