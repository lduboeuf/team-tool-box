RemoteStorage.defineModule('teams', // <-- Module name
  function(privateClient, publicClient) {

  // Declare types here
    privateClient.declareType('team', {
      type: "object",
      properties: {
        id: {
          type: "string"
        },
        name: {
          type: "string"
        },
        members: {
          type: "array",
          default: [],
          items: {
            type: "object",
            properties: {
              id: {
                type: "string"
              },
              name: {
                type: "string"
              }
            }
          }
        }
      },
      required: [ "id", "name" ]
    });


  var teams = {
    // Declare functions here
    archive: {
      find: function find(id) {
        var path = "team/" + id;

        return privateClient.getObject(path).then(function (team) {
          return team;
        });
      },
      store: function(team) {
        team.id = generateUID();
        var path = "team/" + team.id;
        return privateClient.storeObject("team", path, team).
          then(function() {
            console.log(team.id);
            return team;
          });
        },
      findAll: function(){
        return privateClient.getAll('team/').
          then(function(teams){
          return teams;
        });
        }
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

  // Return and export public functions
  return { exports: teams };
});
