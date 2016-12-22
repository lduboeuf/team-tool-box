

app.page("team-member-add", function()
{
  var nameInput = document.querySelector('#team-member-add form input[name="name"]');
  var submitBtn = document.querySelector('#team-member-add form input[name="add"]');

  var selectedTeamId = null;

  submitBtn.onclick = function(e){
    e.preventDefault();
    if (nameInput.value.length>0){
      remoteStorage.teams.addMember(selectedTeamId, { name: nameInput.value}).then(
        function(){
          history.back();
      });
      //TeamRepository.addMember(selectedTeamId, { name: nameInput.value});



    }else {
      //handle error msg
    }


  }

  return function(params) {
    selectedTeamId = params;
    nameInput.value = "";
  }
});
