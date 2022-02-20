function getRand(min, max, fix){
  if(min < 0 || min >= max || fix < 0 || fix > 100){
    return -1; //будем считать, что это код ошибки
  }
  const randResult = Math.random() * (max - min) + min;
  if(fix){
    return Number(randResult.toFixed(fix));
  }
  return Math.round(randResult);
}

getRand(1, 10, 5);
