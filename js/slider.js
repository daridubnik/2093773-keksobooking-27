const minValueType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const slider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');


const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
    step: 1000,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  slider.noUiSlider.on('update', () => {
    priceField.value = slider.noUiSlider.get();
  });
};

const onTypeFieldChange = (evt) => {
  priceField.min = minValueType[evt.target.value];
  priceField.value = minValueType[evt.target.value];
  slider.noUiSlider.updateOptions({
    range: {
      min: minValueType[evt.target.value],
      max: 100000,
    },
    start: minValueType[evt.target.value],
  });
};

const onPriceFieldChange = () => slider.noUiSlider.set(priceField.value);

const resetSlider = () => {
  slider.noUiSlider.reset();
  priceField.min = minValueType[typeField.value];
  priceField.value = minValueType[typeField.value];
  priceField.placeholder = minValueType[typeField.value];
};


export { initSlider, onTypeFieldChange, onPriceFieldChange, resetSlider };
