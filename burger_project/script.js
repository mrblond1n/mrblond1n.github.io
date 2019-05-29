// NAV MENU

const navMenuBtn = document.body.querySelector('.menu-hamburger'), 
navMenuBtnClose = document.body.querySelector('.close-btn'), 
navMenuList = document.body.querySelector('.nav-menu-fullscreen');

navMenuBtn.addEventListener('click', function() {
  navMenuList.classList.remove('deactive');
  document.body.classList.add('lock');
});

navMenuBtnClose.addEventListener('click', function() {
  navMenuList.classList.add('deactive');
  document.body.classList.remove('lock');
});

// ACCORDEON MENU HORIZONTAL


const menu = document.querySelector('.menu'),
accoItem = document.querySelectorAll('.acco-menu__item');

menu.addEventListener('click', function(e) {
  for (let i = 0; i < accoItem.length; i++) {
    accoItem[i].classList.remove('acco-menu__item--active');
  };
});

for (let i = 0; i < accoItem.length; i++) {
  accoItem[i].addEventListener('click', function(e) {
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


// MENU ACCORDEON VERTICAL

const teamMenu = document.querySelector('.team'),
memberCard = document.querySelectorAll('.member__card');

teamMenu.addEventListener('click', function() {
  for (let i = 0; i < memberCard.length; i++) {
    memberCard[i].classList.remove('member__card--active');
  };
});

for (let i = 0; i < memberCard.length; i++) {
  memberCard[i].addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (memberCard[i].classList.contains('member__card--active')) {
      memberCard[i].classList.remove('member__card--active');
    } else {
      for (let i = 0; i < memberCard.length; i++) {
        memberCard[i].classList.remove('member__card--active');
      }
      memberCard[i].classList.add('member__card--active');
    }
  }); 
};

// SLIDER BURGER

const toLeft = document.querySelector('.burger-slider__arrow-left'),
toRight = document.querySelector('.burger-slider__arrow-right'),
sliderList = document.querySelector('.burger-slider__list'),
sliderItem = document.querySelectorAll('.burger-slider__item'),
sliderLength = sliderItem.length - 1;
console.log(sliderLength * -100);

let count = 0;

toRight.addEventListener('click', function() {
  let toRight = -100;
  
  if (count > sliderLength * -100) {
    count += toRight;
  };
  
  sliderList.style.transform = 'translateX(' + count + '%)';
});


toLeft.addEventListener('click', function() {
  let toLeft = 100;

  if(count < 0) {
    count += toLeft;
  };

  sliderList.style.transform = 'translateX(' + count + '%)';
});

