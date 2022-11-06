const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

// Перебирает коллекцию переданных элементов и блокирует/разблокирует элементы в зависимости от указанного состояния
const getStateElements = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

// Переключает страницу в неактивное состояние
const getInactivePage = () => {
  adForm.classList.add('ad-form--disabled');
  getStateElements(adFormElements, true);
  mapFilters.classList.add('map__filters--disabled ');
  getStateElements(mapFiltersElements, true);
};

// Переключает страницу в активное состояние
const getActivePage = () => {
  adForm.classList.remove('ad-form--disabled');
  getStateElements(adFormElements, false);
  mapFilters.classList.remove('map__filters--disabled ');
  getStateElements(mapFiltersElements, false);
};

export {getInactivePage, getActivePage};

