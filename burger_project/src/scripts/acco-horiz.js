(function() {
  const menu = document.querySelector('.menu'),
    accoItem = document.querySelectorAll('.acco-menu__item');

  menu.addEventListener('click', function (e) {
    for (let i = 0; i < accoItem.length; i++) {
      accoItem[i].classList.remove('acco-menu__item--active');
    };
  });

  for (let i = 0; i < accoItem.length; i++) {
    accoItem[i].addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (accoItem[i].classList.contains('acco-menu__item--active')) {
        accoItem[i].classList.remove('acco-menu__item--active');
      } else {
        for (let i = 0; i < accoItem.length; i++) {
          accoItem[i].classList.remove('acco-menu__item--active');
        };

        accoItem[i].classList.add('acco-menu__item--active');
      }
    });
  };
})()
