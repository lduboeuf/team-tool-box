//TODO object in memory
(function(window){

    var STORE_NAME = 'peoples';
    var peoples = fetch() || [];


    function store(){
       console.log(peoples[0]);
        var str = JSON.stringify(peoples);
        localStorage.setItem(STORE_NAME, str);
    }

    function fetch(){
      var peoplesStr = localStorage.getItem(STORE_NAME);
      return JSON.parse(peoplesStr);
    }

    function TeamRepository(){
      console.log('TeamRepo called');

    }

    TeamRepository.findAll = function(){
      return peoples;
    }

    TeamRepository.findById = function(id){
      var people = null;
      for (var i=0; i < peoples.length; i++){
        if (peoples[i].id === id){
            people = peoples[i];
            break;
        }
        return people;
      }
    }




    TeamRepository.remove = function(id){
        for (var i=0; i < peoples.length; i++){
            if (peoples[i].id === id){
                peoples.splice(i, 1);
                break;
            }
        }

        store();
    }


    TeamRepository.save = function(people){
      //add mode
        if (typeof people.id == 'undefined'){
            var id = 1;
            if(peoples.length>0){
                var lastElement = peoples[peoples.length-1];
                if (typeof lastElement.id != 'undefined'){
                    id = lastElement.id + 1;
                }

            }
            people.id = id;
            peoples.push(people);
        }else { //update mode
          var people = findById(people.id);
          if (people){
            people.name = people.name;
          } //TODO exception
        }
        store();
    }

    window.TeamRepository = TeamRepository;


})(this);
