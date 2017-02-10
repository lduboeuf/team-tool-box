app.page("tool-match", function()
{

  var $section = document.getElementById('tool-match');
  var $leftSide = document.getElementById('match-left');
  var $rightSide = document.getElementById('match-right');

  var $resultList = $section.querySelector('.result');


  var $leftTeamList = $leftSide.querySelector('.team-list');
  var $leftResultList = $leftSide.querySelector('.teams-result');

  var $rightTeamList = $rightSide.querySelector('.team-list');
  var $rightResultList = $rightSide.querySelector('.teams-result');


  //store template definition
  var tplTeamList = doT.template($leftTeamList.innerHTML);
  var tplResultList = doT.template($leftResultList.innerHTML);

  var tplOutputRes = doT.template($resultList.innerHTML);



  //empty tpl by default
  $leftTeamList.innerHTML = $rightTeamList.innerHTML = '<option value="-1" selected="selected"></option>';
  $leftResultList.innerHTML= $rightResultList.innerHTML = null;
  $resultList.innerHTML = null;

  var shuffle = function(members){
    var j, x, i;
    for (i = members.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = members[i - 1];
        members[i - 1] = members[j];
        members[j] = x;
    }

  }

  var displayTeams =function(teams,$side ){
    $side.innerHTML =  tplResultList(teams);
    var $checkbox_members = $side.querySelectorAll('input[name="member_name"]');
    //handle tick all
    $side.querySelector('input[name="tick_all"]').onclick = function(){
      var checked = this.checked;
      for (var i=0; i < $checkbox_members.length; i++){
        $checkbox_members[i].checked = checked;
      }
    }

    //handle already selected members from left
    if ($side==$rightResultList){
      var leftMembers = getSelectedMembers($leftResultList);
      if (leftMembers.length>0){
        var $checkbox_members = $rightResultList.querySelectorAll('input[name="member_name"]');
        for (var i=0; i < $checkbox_members.length; i++){
          if (leftMembers.includes($checkbox_members[i].value)){
            $checkbox_members[i].parentNode.style='text-decoration:line-through';
            $checkbox_members[i].disabled = true;
          }
        }
      }
    }


  }

  var changeEvent = function($select, $side){
    var teamId = $select.value;
    if (teamId==-1){

      remoteStorage.teams.findAll().then(function(teams){
        displayTeams(teams, $side);
        }
      );


    }else{
      remoteStorage.teams.find(teamId).then(
        function(team){
          var teams = {};
          teams[teamId] = team;
          displayTeams(teams, $side);
        }
      );
    }
  }

  $leftTeamList.onchange = function(e){
    changeEvent(this, $leftResultList);
  }
  $rightTeamList.onchange = function(e){
    changeEvent(this, $rightResultList);
  }

  var getSelectedMembers = function($list){
    var $checkbox_members = $list.querySelectorAll('input[name="member_name"]');
    var members = [];
    for (var i=0; i < $checkbox_members.length; i++){
      if ($checkbox_members[i].checked){
        members.push($checkbox_members[i].value);
      }
    }
    shuffle(members);
    return members;
  }


  $section.querySelector('input[type="submit"]').onclick = function(e){
    e.preventDefault();

    var leftMembers = getSelectedMembers($leftResultList);
    var rightMembers = getSelectedMembers($rightResultList);

    $resultList.innerHTML = tplOutputRes({left:leftMembers, right:rightMembers});

    window.scrollTo(0,document.body.scrollHeight);

  }

    //save output



  return function(params) {

    remoteStorage.teams.findAll().then(
      function(teams){

        if (Object.keys(teams).length === 0){
          app.alert('alert-info','humm, no members found, you can add members by clicking on the "My Groups" menu');
        }
        $leftTeamList.innerHTML = tplTeamList(teams);
        $rightTeamList.innerHTML = tplTeamList(teams);
      }
    );


  }
});