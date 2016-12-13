//TODO object in memory
(function(window){

    var STORE_NAME = 'ttb';
    //localStorage.clear();
    var data = fetch() || { last_member_id: 0, last_team_id: 0, last_archive_id:0,  teams : [], archives: [] };

    //data.archives = null;
    //archive patch
    if (!data.archives){
      data.archives= [];
      data.last_archive_id=0;
    }

    function store(){
        var str = JSON.stringify(data,['last_member_id','last_team_id','last_archive_id','teams','members','name','id','archives','description']);
        localStorage.setItem(STORE_NAME, str);
    }

    function fetch(){
      var teamsStr = localStorage.getItem(STORE_NAME);
      return JSON.parse(teamsStr);
    }

    function findById(collection, id){
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }
      }
      return null;
    }



    function TeamRepository(){
      console.log('TeamRepo called');

    }

    TeamRepository.findAll = function(){
      return data.teams;
    }

    TeamRepository.findById = function(id){
      return findById(data.teams, id);
    }




    TeamRepository.removeMember = function(memberId){

      for (var i=0; i < data.teams.length; i++){
        var members = data.teams[i].members;
        for (var i=0; i < members.length; i++){
            if (members[i].id === memberId){
                members.splice(i, 1);
                break;
            }
        }

      }

      store();
    }

    TeamRepository.addTeam = function(team){
      //add mode
      data.last_team_id++;
      team.id = data.last_team_id;
      data.teams.push(team);
      store();
    }

    TeamRepository.removeTeam = function(teamId){
      for (var i=0; i < data.teams.length; i++){
        var team = data.teams[i];
        if (team.id === teamId){
            data.teams.splice(i, 1);
            break;
        }
      }

      store();
    }

    TeamRepository.removeArchive = function(archiveId){
      for (var i=0; i < data.archives.length; i++){
        var archive = data.archives[i];
        if (archive.id === archiveId){
            data.archives.splice(i, 1);
            break;
        }
      }

      store();
    }

    TeamRepository.addArchive = function(archive){
      data.last_archive_id++;
      archive.id = data.last_archive_id;

      data.archives.push(archive);
      store();
    }

    TeamRepository.findArchives =function(){
      return data.archives;
    }
    TeamRepository.findArchive =function(archiveId){
      return findById(data.archives,archiveId);
    }

    TeamRepository.findMember = function(memberId){
      for (var i=0; i < data.teams.length; i++){
        var member = findById(data.teams[i].members, memberId );
        if (member){
          return member;
        }
      }
      //not found
      return null;
    }

    TeamRepository.addMember = function(teamId, member){
      //add mode
      var team = findById(data.teams, teamId);
      if (!team){
        throw 'gloups, team does not exist';
      }

      if (!team.members){
        team.members = [];
      }

      var members = team.members;
      data.last_member_id++;
      member.id = data.last_member_id;
      members.push(member);


      store();
    }

    TeamRepository.save = store;



    TeamRepository.updateMember = function(teamId, member){

      var team = findById(teamId);
      if (!team){
        throw 'gloups, team does not exist';
      }

      var member = findById(team.members, id);
      if (member){
        member.name = member.name;
      }
      //TODO exception

      store();
    }

    window.TeamRepository = TeamRepository;


})(this);
