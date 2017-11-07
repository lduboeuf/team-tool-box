var TTBTeams = {
  name: 'teams',
  builder: function(privateClient){
    privateClient.cache('', 'ALL');

  privateClient.cache('', 'ALL');
  privateClient.declareType('team', {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "name": {
      "type": "string"
      },
      "members": {
        "type": "array",
        "default": [],
        "items":{
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "name": {
            "type": "string"
            }
          }
        }
      }
    },
    "required": [ "id", "name" ]
  });

  var upgrade = function(client){
    return client.getAll("team/").then(function(teams){

      var toStore = [];
      var toDelete = [];
      for (var teamId in teams) {
        toStore.push(client.storeObject('',teamId,teams[teamId]));
        toDelete.push(client.remove('team/' + teamId));
      }
      toDelete.push(client.remove('team/'));
      if (toStore.length==0) return false;
      return Promise.all(toStore).then(function() {
          console.log("items moved from teams/team/ to teams/");
          return Promise.all(toStore).then(function() {
            console.log('items removed at teams/team/*');
            return true;
          }).catch(function(e) {
            console.log('oups...' + e);
            return false;
          })
      })
      .catch(function(e) {
          console.log('oups...' + e);
          return false;
      });

    });
  }

  var teams = {

        upgrade: function() {
          return upgrade(privateClient);
        },

        store: function(team) {
          if (!team.id){
            team.id = generateUID();
            team.members = [];
          }
          return privateClient.storeObject("team", team.id, team).
            then(function() {
              return team;
            });
        },
        addMember: function(teamId, member){
          return remoteStorage.teams.find(teamId).then(
            function(team){
              member.id = generateUID();
              team.members.push(member);
              return remoteStorage.teams.store(team);
            });
        },
        findMember: function(memberId){
          return privateClient.getAll('').then(function(teams){
            for (var property in teams) {
              var member = findById(teams[property].members, memberId);
              if (member){
                return member;
              }
            }
            return null;
          })
        },
        updateMember: function(member){
          return privateClient.getAll('').then(function(teams){
            for (var property in teams) {
              var members = teams[property].members;
              for (var i=0; i < members.length; i++){
                  if (members[i].id === member.id){
                    members[i] = member;
                    return remoteStorage.teams.store(teams[property]);
                  }

              }
            }
            return null;
          })

        },
        removeMember: function(memberId){
          return privateClient.getAll('').then(function(teams){
            for (var property in teams) {
              var members = teams[property].members;
              for (var i=0; i < members.length; i++){
                  if (members[i].id === memberId){
                      members.splice(i, 1);
                      return remoteStorage.teams.store(teams[property]);
                  }
              }
            }
            return false;
          })
        },
        remove: function(teamId){
          return privateClient.remove(teamId);
        },
        find: function(id) {
          return privateClient.getObject(id);
        },
        findAll: function(){
          return privateClient.getAll("");
        }
  };

  var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ID_LENGTH = 8;

  var generateUID = function() {
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }

  var findById = function(collection, id){
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return collection[i];
      }
    }
    return null;
  }

    // Return and export public functions
   return { exports: teams };
 }
};
