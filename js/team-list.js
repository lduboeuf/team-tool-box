
  app.page("team-list", function()
  {

    var tpl = document.querySelector('ul.teamlist');
    var peoples = TeamRepository.getPeoples();
    console.log(peoples);
    if (!peoples) {
        peoples = [];
    }

    
    return function(params) {
      var output = mustache(tpl.innerHTML,{ peoples: peoples });
      tpl.innerHTML = output;
    }
  });
