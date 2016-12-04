
  app.page("team-list", function()
  {

    var olist = document.querySelector('ul.teamlist');
    var tpl = olist.innerHTML;


    return function(params) {
      console.log('kikou');
      var peoples = TeamRepository.findAll();

      var output = mustache(tpl, { list: peoples} );
      olist.innerHTML = output;
    }
  });
