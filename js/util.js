// Возвращает случайное положительное число из заданного диапазона, вкл. пограничные значения; с указанием количества знаков после запятой (по умолчанию - целое число)
const getRandomPositiveNumber = (min, max, digits = 0) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  if (digits) {
    return +(Math.random() * (max - min) + min).toFixed(digits);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Возвращает случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomPositiveNumber(0, array.length - 1)];

// Возвращает существительное в нужном падеже
const getCase = (number, word, cases = [2, 0, 1, 1, 1, 2]) => word[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

export {getRandomPositiveNumber, getRandomArrayElement, getCase};
