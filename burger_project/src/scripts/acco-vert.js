(function() {
  const teamMenu = document.querySelector('.team'),
    memberCard = document.querySelectorAll('.member__card');

  teamMenu.addEventListener('click', function () {
    for (let i = 0; i < memberCard.length; i++) {
      memberCard[i].classList.remove('member__card--active');
    };
  });

  for (let i = 0; i < memberCard.length; i++) {
    memberCard[i].addEventListener('click', function (e) {
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
})()
