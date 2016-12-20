
  app.page("team-list-details", function()
  {

    var $teamListDetails = document.getElementById('team-list-details');
    var tpl = doT.template($teamListDetails.innerHTML);

    var currentTeamId = null;

    //default is not shown
    $teamListDetails.innerHTML=null;

    var remove = function(){
      if (confirm('sure you want to remove this team ?')){
        TeamRepository.remove(currentTeamId);
        history.back();
      }
      return false;
    }


    return function(params) {
      currentTeamId = params;
      var team = TeamRepository.findById(currentTeamId);
      $teamListDetails.innerHTML = tpl(team);

      $teamListDetails.querySelector('.remove-link').onclick=remove;

    }
  });
