
  app.page("team-list-details", function()
  {

    var $teamListDetails = document.getElementById('team-list-details');
    var $teamListHeader = $teamListDetails.querySelector('header');
    var $linkRemoveTeam = $teamListHeader.querySelector('.remove-link');
    //form add member
    var $txtName = $teamListDetails.querySelector('form input[name="name"]');
    var $btnAdd = $teamListDetails.querySelector('form input[type="submit"]');
    //list of members
    var $listMembers = $teamListDetails.querySelector('.team-members');
    var $liMember = $listMembers.querySelector('li a');

    var tplHeader = doT.template($teamListHeader.innerHTML);
    var tplTeamList = doT.template($listMembers.innerHTML);
    var tplMember = doT.template($liMember.innerHTML);

    var currentTeamId = null;

    //default is not shown
    $teamListHeader.innerHTML = null;
    $listMembers.innerHTML = null;

    var remove = function(){
      if (confirm('sure you want to remove this team ?')){

        remoteStorage.teams.remove(currentTeamId).then(function(){
          history.back();
        })

      }
      return false;
    }

    var addMember = function(e){
      e.preventDefault();
      //var $nameInput = $teamListDetails.querySelector('input[name="name"]');
      if ($txtName.value.length>0){
        remoteStorage.teams.addMember(currentTeamId, { name: $txtName.value}).then(
          function(member){
            var $member = document.createElement('li');
            $member.innerHTML = '<a href="#team-member-details:' + member.id + '">' + member.name + '</a>';
            $listMembers.appendChild($member);
        });
      }
    }


    var applyTemplate =function(team){
      $teamListHeader.innerHTML = tplHeader(team);
      $listMembers.innerHTML = tplTeamList(team);

    }
    //event listeners
    $linkRemoveTeam.onclick=remove;
    $btnAdd.onclick=addMember;


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
