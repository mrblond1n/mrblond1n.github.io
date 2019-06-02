const form = document.querySelector('#form-order'),
  orderButton = document.querySelector('#orderButton'),
  xhr = new XMLHttpRequest(),
  successOrder = document.querySelector('.success-order'),
  failedOrder = document.querySelector('.failed-order'),
  closeSuccessMessage = document.querySelector('#close__success-message'),
  closeFailedMessage = document.querySelector('#close__failed-message'),
  requiredItems = document.querySelectorAll('.required'),
  numberOnly = document.querySelectorAll('.number-only'),
  textOnly = document.querySelector('.text-only'),
  userPhone = document.querySelector('#user-phone'),
  helpForm = document.querySelector('.helpForNumber');


function reqReadyStateChange() { // ??
  if (xhr.readyState == 4 && xhr.status == 200) { 

    let message = JSON.parse(xhr.responseText);

    if (message.status == 1) { // валидное заполнение
      console.log('Заказ принят!');
      successOrder.style.display = "flex";
      document.body.classList.add('lock');
      closeSuccessMessage.addEventListener('click', () => {
        successOrder.style.display = "none";
        document.body.classList.remove('lock');
        for (let i = 0; i < requiredItems.length; i++) {
          requiredItems[i].classList.remove('required--active'); // удаление обводки красным, если поля заполнены правильно
        };
        document.querySelector('#resetButton').click();
      });
    } else if (message.status == 0) { // невалидное заполнение
      console.log('Ошибка в принятии заказа, попробуйте позже');
      for (let i = 0; i < requiredItems.length; i++) {    // обводка красным незаполненные поля.
        if (requiredItems[i].value == '' || requiredItems[i].value == '+7') {
          requiredItems[i].classList.add('required--active');
          if (!userPhone.validity.patternMismatch) {
            userPhone.classList.remove('required--active');
          }
        };
        requiredItems[i].addEventListener('click', () => { // удаление обводки, при клике.
          requiredItems[i].classList.remove('required--active');
        });
      };
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
  
  if (userPhone.validity.patternMismatch) { // проверка по паттерну номер телефона

    url = "https://webdev-api.loftschool.com/sendmail/fail";
  } else {
    url = "https://webdev-api.loftschool.com/sendmail";
  }

  for (let i = 0; i < requiredItems.length; i++) { // проверка на заполненность форм
    if (requiredItems[i].value == "") {
      url = "https://webdev-api.loftschool.com/sendmail/fail";
    }
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

for (let i = 0; i < numberOnly.length; i++) { // запрет ввода букв
  numberOnly[i].addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      e.preventDefault();
    };
  });
};

textOnly.addEventListener('keydown', function (e) { // запрет ввода цифр
  if (isFinite(e.key) || e.key == '+' || e.key == '/') {
    e.preventDefault();
  };
});



userPhone.addEventListener('focus', () => { // всплывающая подсказка для заполнения формы телефона
  if (userPhone.validity.patternMismatch || userPhone.value == '+7') {
    helpForm.innerText = 'Пример ввода: +79990009900';
  } else {
    helpForm.innerText = '';
  };
  userPhone.addEventListener('blur', () => { // скрытие подсказки для заполнения формы телефона
    helpForm.innerText = '';
  });
});


