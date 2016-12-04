

app.page("team-add", function()
{

  var submitBtn = document.querySelector('form input[name="add-member"]');
  submitBtn.onclick = function(e){
    e.preventDefault();
    var nameInput = document.querySelector('form input[name="member-name"]');
    window.TeamRepository.save({ "name": nameInput.value});
    //refresh view
    //hack:..., not compatible old browser grrr.....
    history.pushState(null, null, "#team-list");
    app("team-list");

  }

  return function(params) {
    //nothing to handle here
  }
});
