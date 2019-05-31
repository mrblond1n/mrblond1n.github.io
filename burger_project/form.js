const form = document.querySelector('#form-order'),
  orderButton = document.querySelector('#orderButton'),
  xhr = new XMLHttpRequest(),
  successOrder = document.querySelector('.success-order'),
  failedOrder = document.querySelector('.failed-order'),
  closeSuccessMessage = document.querySelector('#close__success-message'),
  closeFailedMessage = document.querySelector('#close__failed-message');

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
      });
    } else if (message.status == 0) {
      console.log('Ошибка в принятии заказа, попробуйте позже');
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
  let formData = new FormData(),
    url = "https://webdev-api.loftschool.com/sendmail/fail";

  formData.append('name', form.elements.user_name.value);
  formData.append('phone', form.elements.user_phone.value);
  formData.append('comment', form.elements.user_comment.value || '');
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