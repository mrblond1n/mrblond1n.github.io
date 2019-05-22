let menuBtn = document.body.querySelector('.menu-hamburger');

menuBtn.addEventListener('click', function(e) {
  let menuList = document.body.querySelector('.menu__list-fullscreen');
  menuList.classList.toggle('deactive');
})