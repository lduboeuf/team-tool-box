//alert msg handler
app.alert = function(type, message){
  var className='.'+type;
  var alertBox = document.querySelector(className);
  var alertMsg = alertBox.querySelector('.alert-msg');
  alertMsg.innerHTML = message;
  alertBox.style.display = 'block';
}
