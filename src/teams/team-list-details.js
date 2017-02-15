
  app.page("team-list-details", function()
  {

    var $teamListDetails = document.getElementById('team-list-details');
    var $header = $teamListDetails.querySelector('h2');

    var $nameInput = $teamListDetails.querySelector('input[name="name"]');
    var $btnAddMember = $teamListDetails.querySelector('input[type="submit"]');

    var $ulTeamMembers = $teamListDetails.querySelector('ul.team-members');

    var tplHeader = doT.template($header.innerHTML);
    var tplMembers = doT.template($ulTeamMembers.innerHTML);

    var currentTeamId = null;

    //default is not shown
    //$teamListDetails.innerHTML=null;
    $ulTeamMembers.innerHTML = null;

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
      if ($nameInput.value.length>0){
        remoteStorage.teams.addMember(currentTeamId, { name: $nameInput.value}).then(
          function(team){
            applyTemplate(team);
        });
      }
    }

    var applyTemplate =function(team){

      $ulTeamMembers.innerHTML = tplMembers(team);
      $header.innerHTML = tplHeader(team);

      $nameInput.value = "";
      $teamListDetails.querySelector('button[name="remove"]').onclick=remove;
    }


    $teamListDetails.querySelector('input[type="submit"]').onclick=addMember;


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
