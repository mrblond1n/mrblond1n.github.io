(function() {
  const navMenuBtn = document.body.querySelector('.menu-hamburger'),
    navMenuBtnClose = document.body.querySelector('#close-btn__nav-menu'),
    navMenuList = document.body.querySelector('.nav-menu-fullscreen');

  navMenuBtn.addEventListener('click', function () {
    navMenuList.classList.remove('deactive');
    document.body.classList.add('lock');
  });

  navMenuBtnClose.addEventListener('click', function () {
    navMenuList.classList.add('deactive');
    document.body.classList.remove('lock');
  });
})()
