const getRandomNumber = (min, max, decimalPlace = 0) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return +(Math.random() * (max - min + 1) + min).toFixed(decimalPlace);
};

getRandomNumber(1, 10, 2);
