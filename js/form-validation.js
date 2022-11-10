const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;
const NUMBER_OF_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
});

Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});
Pristine.setLocale('ru');

//Валидация заголовка
const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const getTitleErrorMessage = () => `От ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`;

pristine.addValidator(title, validateTitle, getTitleErrorMessage);

//Валидация цены
const validatePrice = (value) => value <= MAX_PRICE;
const getPriceErrorMessage = () => `Максимальная цена ${MAX_PRICE}`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

//Валидация вместимости гостей
const validateСapacity = () => NUMBER_OF_GUESTS[roomNumber.value].includes(capacity.value);
const getСapacityErrorMessage = () => {
  if (roomNumber.value === '100') {
    return 'Не для гостей';
  }
  return `Указанное количество комнат вмещает ${NUMBER_OF_GUESTS[roomNumber.value].join(', ')} ${roomNumber.value === '1' ? 'гостя' : 'гостей'}`;
};

pristine.addValidator(capacity, validateСapacity, getСapacityErrorMessage);


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

