import { markerGroup, addMarkerGroup } from './init-map.js';
import { debounce } from './util.js';

const DEFAULT_VALUE = 'any';
const DELAY_TIME = 500;
const MAX_ADVERTS_COUNT = 10;
const PRICE_FILTER = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: 100000
  }
};

const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');


const checkType = (advert) => typeFilter.value === advert.offer.type || typeFilter.value === DEFAULT_VALUE;
const checkPrice = (advert) => advert.offer.price >= PRICE_FILTER[priceFilter.value].min && advert.offer.price <= PRICE_FILTER[priceFilter.value].max || priceFilter.value === DEFAULT_VALUE;
const checkRooms = (advert) => +roomsFilter.value === advert.offer.rooms || roomsFilter.value === DEFAULT_VALUE;
const checkGuests = (advert) => +guestsFilter.value === advert.offer.guests || guestsFilter.value === DEFAULT_VALUE;
const checkFeatures = (advert) => Array.from(featuresFilter).every((filterFeature) => {
  if (!filterFeature.checked) {
    return true;
  }
  if (!advert.offer.features) {
    return false;
  }
  return advert.offer.features.includes(filterFeature.value);
});

const checkAllFilters = (adverts) => {
  const filteredData = [];
  for (let i = 0; i < adverts.length; i++) {
    const advert = adverts[i];
    if (
      checkType(advert) &&
      checkPrice(advert) &&
      checkRooms(advert) &&
      checkGuests(advert) &&
      checkFeatures(advert)
    ) {
      addMarkerGroup(advert);
      filteredData.push(advert);
    }
    if (filteredData.length === MAX_ADVERTS_COUNT) {
      break;
    }
  }
  return filteredData;
};

const activateFilters = (cb) => {
  mapFilters.addEventListener('change', debounce(() => {
    markerGroup.clearLayers();
    cb();
  }, DELAY_TIME));
};

const resetFilters = () => {
  mapFilters.reset();
};


export { checkAllFilters, activateFilters, resetFilters };
