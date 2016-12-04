app.page("team-member-details", function()
  {
    // initialize view variables

    var form = document.querySelector('#team-member-details form');
    var $id = form.querySelector('[name="id"]');
    var $name = form.querySelector('[name="name"]');
    var submitBtn = form.querySelector('input[name="update-member"]');
    var removeBtn = form.querySelector('input[name="remove-member"]');

    submitBtn.onclick = function(e){
      e.preventDefault();
      var member = TeamRepository.findById(parseInt($id.value));
      member.name = $name.value;

      TeamRepository.save(member);
      history.pushState(null, null, "#team-list");
      app("team-list");

    }

    removeBtn.onclick = function(e){
      e.preventDefault();
      TeamRepository.remove(parseInt($id.value));
      //TODO handle error
      history.pushState(null, null, "#team-list");
      app("team-list");
    }

    // present the view - load data and show:
    return function(params) {
      var id = parseInt(params);
      var member = TeamRepository.findById(id);

      $id.value = member.id;
      $name.value = member.name;
    }
  });
