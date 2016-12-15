//TODO object in memory
(function(window){

    var TEAM_STORE_REPOSITORY = {name: 'ttb-team', fields:['teams','members','name','id']} ;
    var ARCHIVE_STORE_REPOSITORY = {name:'ttb-archive', fields: ['archives','teams','members', 'name','id','description']};
    //localStorage.clear();
    var Teams = fetch(TEAM_STORE_REPOSITORY.name) || { teams : [],  };
    var Archives = fetch(ARCHIVE_STORE_REPOSITORY.name) || {  archives: [] };

    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 8;

    var generateUID = function() {
      var rtn = '';
      for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
      }
      return rtn;
  }


    function store(storage, data){
        var str = JSON.stringify(data, storage.fields);
        localStorage.setItem(storage.name, str);
    }

    function fetch(storageName){
      var teamsStr = localStorage.getItem(storageName);
      return JSON.parse(teamsStr);
    }


    function findById(collection, id){
      if (!collection) return null;
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }
      }
      return null;
    }



    function TeamRepository(){}

    TeamRepository.findAll = function(){
      return Teams.teams;
    }

    TeamRepository.findById = function(id){
      return findById(Teams.teams, id);
    }






    TeamRepository.addTeam = function(team){
      team.id = generateUID();
      team.members = [];
      Teams.teams.push(team);
      store(TEAM_STORE_REPOSITORY, Teams);
    }

    TeamRepository.removeTeam = function(teamId){
      for (var i=0; i < Teams.teams.length; i++){
        var team = Teams.teams[i];
        if (team.id === teamId){
            Teams.teams.splice(i, 1);
            break;
        }
      }

      store(TEAM_STORE_REPOSITORY, Teams);
    }

    TeamRepository.removeArchive = function(archiveId){
      for (var i=0; i < Archives.archives.length; i++){
        var archive = Archives.archives[i];
        if (archive.id === archiveId){
            Archives.archives.splice(i, 1);
            break;
        }
      }

      store(ARCHIVE_STORE_REPOSITORY, Archives);
    }

    TeamRepository.addArchive = function(archive){
      archive.id = generateUID();
      Archives.archives.push(archive);
      store(ARCHIVE_STORE_REPOSITORY, Archives);
    }

    TeamRepository.findArchives =function(){
      return Archives.archives;
    }
    TeamRepository.findArchive =function(archiveId){
      return findById(Archives.archives,archiveId);
    }

    TeamRepository.findMember = function(memberId){
      for (var i=0; i < Teams.teams.length; i++){
        var member = findById(Teams.teams[i].members, memberId );
        if (member){
          return member;
        }
      }
      //not found
      return null;
    }

    TeamRepository.addMember = function(teamId, member){
      //add mode
      var team = findById(Teams.teams, teamId);
      if (!team){
        throw 'gloups, team does not exist';
      }


      var members = team.members;
      member.id = generateUID();
      members.push(member);


      store(TEAM_STORE_REPOSITORY, Teams);
    }

    TeamRepository.removeMember = function(memberId){

      for (var i=0; i < Teams.teams.length; i++){
        var members = Teams.teams[i].members;
        if (members){
          for (var j=0; j < members.length; j++){
              if (members[j].id === memberId){
                  members.splice(j, 1);
                  break;
              }
          }
        }
      }

      store(TEAM_STORE_REPOSITORY, Teams);
    }

    TeamRepository.save = function(){
      store(TEAM_STORE_REPOSITORY, Teams);
    }


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

      store(TEAM_STORE_REPOSITORY, Teams);
    }

    window.TeamRepository = TeamRepository;


})(this);
