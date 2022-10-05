function getRundomIntegralNumber(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (max < min) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRundomIntegralNumber (1, 15);

function getRundomNumber(min, max, decimalPlace) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (max < min) {
    return NaN;
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimalPlace));
}

getRundomNumber (1, 10, 2);
