const form = document.querySelector('#form-order'),
  orderButton = document.querySelector('#orderButton'),
  xhr = new XMLHttpRequest(),
  successOrder = document.querySelector('.success-order'),
  failedOrder = document.querySelector('.failed-order'),
  closeSuccessMessage = document.querySelector('#close__success-message'),
  closeFailedMessage = document.querySelector('#close__failed-message'),
  requiredItems = document.querySelectorAll('.required'),
  numberOnly = document.querySelectorAll('.number-only'),
  textOnly = document.querySelector('.text-only');

function reqReadyStateChange() { // ??
  if (xhr.readyState == 4 && xhr.status == 200) {

    let message = JSON.parse(xhr.responseText);

    if (message.status == 1) {
      console.log('Заказ принят!');
      successOrder.style.display = "flex";
      document.body.classList.add('lock');
      closeSuccessMessage.addEventListener('click', () => {
        successOrder.style.display = "none";
        document.body.classList.remove('lock');
        for (let i = 0; i < requiredItems.length; i++) {
          requiredItems[i].classList.remove('required--active');
        };
        document.querySelector('#resetButton').click();
      });
    } else if (message.status == 0) {
      console.log('Ошибка в принятии заказа, попробуйте позже');
      for (let i = 0; i < requiredItems.length; i++) {
        requiredItems[i].classList.add('required--active');
        requiredItems[i].addEventListener('click', () => {
          requiredItems[i].classList.remove('required--active');
        })
      }
      failedOrder.style.display = "flex";
      document.body.classList.add('lock');
      closeFailedMessage.addEventListener('click', () => {
        failedOrder.style.display = "none";
        document.body.classList.remove('lock');
      });
    };
  };
};

function ajaxForm(form) {
  let formData = new FormData();

  let userName = form.elements.user_name,
    userPhone = form.elements.user_phone,
    userComment = form.elements.user_comment;
  
  if (userName.validity.patternMismatch
    || userName.value == '' 
    || userPhone.validity.patternMismatch 
    || userPhone.value == ''
    || userComment.value == '') {
    url = "https://webdev-api.loftschool.com/sendmail/fail";
  } else {
    url = "https://webdev-api.loftschool.com/sendmail";
  }


  formData.append('name', userName.value);
  formData.append('phone', userPhone.value);
  formData.append('comment', userComment.value);
  formData.append('to', 'mail@mail.ru');

  xhr.open("POST", url);
  xhr.setRequestHeader = ("X-Requested-With", "XMLHttpRequest");
  xhr.onreadystatechange = reqReadyStateChange; // ???
  xhr.send(formData);
};

orderButton.addEventListener('click', function (e) {
  e.preventDefault();

  ajaxForm(form);
});

for (let i = 0; i < numberOnly.length; i++) {
  numberOnly[i].addEventListener('keydown', function (e) {

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      e.preventDefault();
    };

  });
};

textOnly.addEventListener('keydown', function (e) {
  if (isFinite(e.key) || e.key == '+' || e.key == '/') {
    e.preventDefault();
  };
});
