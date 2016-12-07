//TODO object in memory
var TeamRepository = {

        STORE_NAME : 'peoples',

        getPeoples: function(){
            var peoplesStr = localStorage.getItem(this.STORE_NAME);
            return JSON.parse(peoplesStr);
        },

        store: function(peoples){
            var str = JSON.stringify(peoples);
            localStorage.setItem(this.STORE_NAME, str);
        },

        remove: function(id){
            var peoples = this.getPeoples();
            for (var i=0; i < peoples.length; i++){
                if (peoples[i].id == id){
                    peoples.splice(i, 1);
                    break;
                }
            }

            this.store(peoples);
        },


        save: function(people){

            var peoples = this.getPeoples();
            if(!peoples){
            	peoples = [];
            }
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
                for (var i=0; i < peoples.length; i++){
                    if (peoples[i].id == people.id){
                        peoples[i].name = people.name;
                        break;
                    }
                }
            }
            this.store(peoples);
        }


    }
