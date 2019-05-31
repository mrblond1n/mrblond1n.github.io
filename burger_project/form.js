const form = document.querySelector('#form-order'),
  orderButton = document.querySelector('#orderButton'),
  xhr = new XMLHttpRequest();

  // let userName = document.querySelector('#')

function reqReadyStateChange() { // ??
  if (xhr.readyState == 4 && xhr.status == 200) {
    let message = JSON.parse(xhr.responseText);

    if (message.status == 1) {
      console.log('Заказ принят!');
      console.log(message.data.name + ': ' + message.data.phone);
    } else if (message.status == 0) {
      console.log('Ошибка в принятии заказа, попробуйте позже');
    };

  }
}

function ajaxForm(form) {
  let formData = new FormData(),
    url = "https://webdev-api.loftschool.com/sendmail";

  formData.append('name', form.elements.user_name.value);
  formData.append('phone', form.elements.user_phone.value);
  formData.append('comment', form.elements.user_comment.value || '');
  formData.append('to', 'mail@mail.ru');

  xhr.open("POST", url);
  xhr.setRequestHeader = ("X-Requested-With", "XMLHttpRequest");
  xhr.onreadystatechange = reqReadyStateChange; // ???
  xhr.send(formData);
}


orderButton.addEventListener('click', function (e) {
  e.preventDefault();

  ajaxForm(form);
});