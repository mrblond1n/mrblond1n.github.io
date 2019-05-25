let menuBtn = document.body.querySelector('.menu-hamburger'), 
menuBtnClose = document.body.querySelector('.close-btn'), 
menuList = document.body.querySelector('.menu-fullscreen');

menuBtn.addEventListener('click', function() {
  menuList.classList.remove('deactive');
  document.body.classList.add('lock');
});

menuBtnClose.addEventListener('click', function() {
  menuList.classList.add('deactive');
  document.body.classList.remove('lock');
})
