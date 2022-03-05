function getRand(min, max, fix) {
  if (min < 0 || min >= max || fix < 0 || fix > 100) {
    return -1; //будем считать, что это код ошибки
  }
  const randResult = Math.random() * (max - min) + min;
  if (fix) {
    return Number(randResult.toFixed(fix));
  }
  return Math.round(randResult);
}

function getRandElement(array) {
  return array[getRand(0, array.length - 1)];
}

function getRandSequence(array) {
  return array.slice(0, getRand(1, array.length));
}

export {getRand, getRandElement, getRandSequence};
