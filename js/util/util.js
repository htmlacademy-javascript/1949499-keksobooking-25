function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function debounce(cb, delay = 500) {
  let timer;
  return (...rest) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, rest), delay);
  };
}

export {
  isEscapeKey,
  debounce
};
