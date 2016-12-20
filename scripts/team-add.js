

app.page("team-add", function()
{
  var $nameInput = document.querySelector('#team-add form input[name="name"]');
  var $submitBtn = document.querySelector('#team-add form input[name="add"]');


  $submitBtn.onclick = function(e){
    e.preventDefault();
    if ($nameInput.value.length>0){
      TeamRepository.add({ "name": $nameInput.value});

      history.back();

    }else {
      //handle error msg
    }


  }

  return function(params) {

    $nameInput.value = "";
  }
});
