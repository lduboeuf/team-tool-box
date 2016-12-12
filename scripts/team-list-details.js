
  app.page("team-list-details", function()
  {

    var o = document.getElementById('team-list-details');
    var tpl= o.innerHTML;

    var currentTeamId = null;

    //default is not shown
    o.innerHTML=null;

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
      o.innerHTML = output;

      o.querySelector('.remove-link').onclick=remove;

    }
  });
