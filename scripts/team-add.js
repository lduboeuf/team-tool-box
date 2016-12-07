

app.page("team-add", function()
{
  var nameInput = document.querySelector('form input[name="member-name"]');
  var submitBtn = document.querySelector('form input[name="add-member"]');


  submitBtn.onclick = function(e){
    e.preventDefault();
    if (nameInput.value.length>0){
      TeamRepository.save({ "name": nameInput.value});
      //refresh view
      //hack:..., not compatible old browser grrr.....
      history.pushState(null, null, "#team-list");
      app("team-list");
    }else {
      //handle error msg
    }


  }

  return function(params) {
    //nothing to handle here
  }
});
