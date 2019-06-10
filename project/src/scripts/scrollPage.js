const sections = $('.section'),
display = $('.maincontent'),
md = new MobileDetect(window.navigator.userAgent),
isMobile = md.mobile();

let inscroll = false;

const switchActiveClassSideMenu = menuItemIndex => {
  $('.fixed-nav-menu__item')
    .eq(menuItemIndex)
    .addClass('fixed-nav-menu__link--active')
    .siblings()
    .removeClass('fixed-nav-menu__link--active');
};



const performTransition = sectionEq => {
    
  if(inscroll) return;

  const transitionDuration = 1000,
    momentum = 100;
  
  inscroll = true;

  const position = `${sectionEq * -100}%`;
  sections
    .eq(sectionEq)
    .addClass('activePage')
    .siblings()
    .removeClass('activePage');


  let maxPos = -100 * (sections.length - 1);
  if(parseInt(position) >= maxPos) {
    display.css({
      transform: `translateY(${position})`
    });
  };

  setTimeout(() => {
    switchActiveClassSideMenu(sectionEq);
    inscroll = false;
  }, transitionDuration + momentum);
};

const scrollToSection = direction => {
  const activeSection = sections.filter('.activePage'),
  nextSection = activeSection.next(),
  prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  };
  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  };
};

$('.wrapper').on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY,
    direction = deltaY > 0 ? "next" : "prev";

    scrollToSection(direction);
  },
  touchmove: e => e.preventDefault()
});

$(document).on('keydown', e => {
  switch (e.keyCode) {
    case 40:
      scrollToSection('next')
      break;
    case 38:
      scrollToSection('prev')
      break;
  };
});

$("[data-scroll-to]").on('click', e => {
  e.preventDefault();

  const target = $(e.currentTarget).attr('data-scroll-to');

  performTransition(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      const nextOrPrev = direction === 'up' ? 'next' : 'prev';

      scrollToSection(nextOrPrev)
    }
  });
};

