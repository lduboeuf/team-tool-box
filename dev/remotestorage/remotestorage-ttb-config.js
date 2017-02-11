RemoteStorage.defineModule("config", function (privateClient, publicClient) {

  privateClient.cache('', 'ALL');
  privateClient.declareType('config', {
    "type": "object",
    "description":"config",
  });

  var config = {
        path : 'aaa',

        get: function(){
          return privateClient.getObject(config.path).then(function(conf){
            if (!conf){
              var conf = {
                team_names : ['blue','green','red','purple','black','pink','grey','orange','yellow','brown']
              }
            }
            return conf;
          });

        },
        set: function(conf) {
          return privateClient.storeObject("config", config.path, conf);
        }
  };



    // Return and export public functions
   return { exports: config };

});
