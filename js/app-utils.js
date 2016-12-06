//alert msg handler
app.alert = function(type, message){
  var alertBox = document.querySelector('.'+type);
  var alertMsg = alertBox.querySelector('.alert-msg');
  alertMsg.innerHTML = message;
  alertBox.style.display = 'block';
}
