
  app.page("team-list", function()
  {

    var olist = document.querySelector('ul.teamlist');
    var tpl = olist.innerHTML;


    return function(params) {
      console.log('kikou');
      var peoples = TeamRepository.getPeoples();

      if (!peoples) {
          peoples = [];
      }

      var output = mustache(tpl,{ peoples: peoples });
      olist.innerHTML = output;
    }
  });
