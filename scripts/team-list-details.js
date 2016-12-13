
  app.page("team-list-details", function()
  {

    var $teamListDetails = document.getElementById('team-list-details');
    var tpl= $teamListDetails.innerHTML;

    var currentTeamId = null;

    //default is not shown
    $teamListDetails.innerHTML=null;

    var remove = function(){
      if (confirm('sure you want to remove this team ?')){
        TeamRepository.removeTeam(currentTeamId);
        history.back();
      }
      return false;
    }


    return function(params) {
      currentTeamId = parseInt(params);
      var team = TeamRepository.findById(currentTeamId);
      var output = mustache(tpl,  team );
      $teamListDetails.innerHTML = output;

      $teamListDetails.querySelector('.remove-link').onclick=remove;

    }
  });
