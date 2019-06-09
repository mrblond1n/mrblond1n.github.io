(function() {
  const toLeft = document.querySelector('.burger-slider__arrow-left'),
    toRight = document.querySelector('.burger-slider__arrow-right'),
    sliderList = document.querySelector('.burger-slider__list'),
    sliderItem = document.querySelectorAll('.burger-slider__item'),
    sliderLength = sliderItem.length - 1;

  let count = 0;

  toRight.addEventListener('click', function () {
    let toRight = -100;

    if (count > sliderLength * -100) {
      count += toRight;
    } else if (count == sliderLength * -100) {
      count = 0;
    };

    sliderList.style.transform = 'translateX(' + count + '%)';
  });


  toLeft.addEventListener('click', function () {
    let toLeft = 100;

    if (count < 0) {
      count += toLeft;
    } else if (count == 0) {
      count = sliderLength * -100
    };

    sliderList.style.transform = 'translateX(' + count + '%)';
  });
})()