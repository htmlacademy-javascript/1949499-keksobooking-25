function getRand(min, max, fix){
    if(min < 0 || min >= max || fix < 0 || fix > 100){
        console.log("Диапазон от 0 до n, где n > 0!"); 
        console.log("fix от 0, до 100!"); 
        return;
    }
    const randResult = Math.random() * (max - min) + min;
    if(fix){
        return Number(randResult.toFixed(fix));
    }
    return Math.round(randResult);
};