app.page("team-member-details", function()
  {
    // initialize view variables

    var formFields = document.querySelector('#team-member-details form div');

    var tpl = formFields.innerHTML;

    var submitBtn = document.querySelector('input[name="update-member"]');
    var removeBtn = document.querySelector('input[name="remove-member"]');
    submitBtn.onclick = function(e){
      e.preventDefault();
      var formFields = document.querySelector('#team-member-details form div');
      var $id = formFields.querySelector('[name="id"]');
      var $name = formFields.querySelector('[name="name"]');

      var member = TeamRepository.findById(parseInt($id.value));
      member.name = $name.value;

      TeamRepository.save(member);
      history.pushState(null, null, "#team-list");
      app("team-list");

    }

    removeBtn.onclick = function(e){
      e.preventDefault();
      var $id = formFields.querySelector('[name="id"]');
      TeamRepository.remove(parseInt($id.value));
      //TODO handle error
      history.pushState(null, null, "#team-list");
      app("team-list");
    }

    // present the view - load data and show:
    return function(params) {
      var id = parseInt(params);
      var member = TeamRepository.findById(id);

      var output = mustache(tpl, { obj: member });
      formFields.innerHTML = output;
    }
  });
