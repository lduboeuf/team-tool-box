app.page("tool-next-member", function()
{

  var $section = document.getElementById('tool-next-member');
  var $teamList = $section.querySelector('.team-list');
  var $resultList = $section.querySelector('.teams-result');
  var $shuffleResult = $section.querySelector('#shuffle-result');


  //store template definition
  var tplTeamList = doT.template($teamList.innerHTML);
  var tplResultList = doT.template($resultList.innerHTML);
  var tplShuffleResult = doT.template($shuffleResult.innerHTML);



  //empty tpl by default
  $teamList.innerHTML = '<option value="-1" selected="selected"></option>';
  $resultList.innerHTML = null;
  $shuffleResult.innerHTML = null;

  var shuffle = function(members){
    var j, x, i;
    for (i = members.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = members[i - 1];
        members[i - 1] = members[j];
        members[j] = x;
    }

  }

  var displayTeams =function(teams){
    $resultList.innerHTML =  tplResultList(teams);
    $section.querySelector('input[type="submit"]').onclick = function(e){
      e.preventDefault();
      $checkbox_members = $section.querySelectorAll('input[name="member_name"]');
      var members = [];
      for (var i=0; i < $checkbox_members.length; i++){
        if ($checkbox_members[i].checked){
          members.push($checkbox_members[i].value);
        }
      }
      shuffle(members);
      $shuffleResult.innerHTML = tplShuffleResult(members);
    }
  }

  $teamList.onchange = function(e){
    var teamId = $teamList.value;
    if (teamId==-1){

      remoteStorage.teams.findAll().then(function(teams){
        displayTeams(teams);
      }
      );


    }else{
      remoteStorage.teams.find(teamId).then(
        function(team){
          var teams = {};
          teams[teamId] = team;
          displayTeams(teams);
        }
      );
    }
  }

    //save output



  return function(params) {

    remoteStorage.teams.findAll().then(
      function(teams){

        if (Object.keys(teams).length === 0){
          app.alert('alert-info','humm, no members found, you can add members by clicking on the "My Groups" menu');
        }
        $teamList.innerHTML = tplTeamList(teams);
      }
    );


  }
});
