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

  var currentSelection = null;

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

  var toggleChilds = function(e){
    var $team = e.currentTarget;
    var checked = $team.checked;
    $checkbox_members = $team.parentNode.parentNode.querySelectorAll('input[name="member_id"]');

    for (var i=0; i < $checkbox_members.length; i++){
      $checkbox_members[i].checked = checked;
    }
  }

  var doResult = function(e){
    e.preventDefault();

    var members = [];
    $checkbox_members = $section.querySelectorAll('input[name="member_id"]');
    for (var i=0; i < $checkbox_members.length; i++){
      if ($checkbox_members[i].checked){
        members.push(currentSelection[$checkbox_members[i].value]);
      }
    }
    shuffle(members);
    $shuffleResult.innerHTML =  tplShuffleResult(members);
    window.scrollTo(0,document.body.scrollHeight);

  }

  var displayTeams =function(teams){

    //store current selected teams for later use
    currentSelection = {};
    for (var t_id in teams){
      var members = teams[t_id].members;
      for (var i=0; i < members.length; i++){
        var m = members[i];
        currentSelection[m.id] = m;
      }
    }


    $resultList.innerHTML =  tplResultList(teams);
    $shuffleResult.innerHTML = null;

    //handle toggle all
    var $ticks = $section.querySelectorAll('input[name="tick_all"]');
    for (var i=0; i < $ticks.length; i++){
      $ticks[i].onclick = toggleChilds;
    }

    $section.querySelector('input[type="submit"]').onclick = doResult;

  }

  $teamList.onchange = function(e){
    var teamId = $teamList.value;
    if (teamId==-1){

      remoteStorage.teams.findAll().then(function(teams){
        displayTeams(teams);
      });


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
