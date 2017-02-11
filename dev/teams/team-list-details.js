
  app.page("team-list-details", function()
  {

    var $teamListDetails = document.getElementById('team-list-details');

    var tpl = doT.template($teamListDetails.innerHTML);

    var currentTeamId = null;

    //default is not shown
    $teamListDetails.innerHTML=null;

    var remove = function(){
      if (confirm('sure you want to remove this team ?')){

        //TeamRepository.removeTeam(currentTeamId);
        remoteStorage.teams.remove(currentTeamId).then(function(){
          history.back();
        })

      }
      return false;
    }

    var addMember = function(e){
      e.preventDefault();
      var $nameInput = $teamListDetails.querySelector('input[name="name"]');
      if ($nameInput.value.length>0){
        remoteStorage.teams.addMember(currentTeamId, { name: $nameInput.value}).then(
          function(team){
            applyTemplate(team);
        });
      }
    }

    var applyTemplate =function(team){
      $teamListDetails.innerHTML = tpl(team);
      $teamListDetails.querySelector('.remove-link').onclick=remove;
      $teamListDetails.querySelector('input[type="submit"]').onclick=addMember;
    }


    return function(params) {
      currentTeamId = params;

      //var team = TeamRepository.findById(currentTeamId);
      remoteStorage.teams.find(currentTeamId).then(
        function(team){
          applyTemplate(team);
        }
      )
    }
  });
